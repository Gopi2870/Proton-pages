import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MoleculeData } from '../../../types/chemistry';

export interface AtomDataPoint {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
}

interface MolecularViewer3DProps {
  molecule: MoleculeData;
  displayMode: '3d-ball-and-stick' | '3d-space-filling' | '2d-skeletal' | '3d-wireframe';
  autoRotate?: boolean;
  onAtomSelect?: (atom: AtomDataPoint | null) => void;
}

const ELEMENT_COLORS: Record<string, number> = {
  C: 0x334155, // Dark slate
  H: 0xf1f5f9, // Light silver
  O: 0xef4444, // Red
  N: 0x2563eb, // Cobalt blue
  P: 0xf97316, // Orange
  S: 0xeab308, // Yellow
  Cl: 0x10b981, // Emerald green
  F: 0x06b6d4, // Cyan
  Br: 0x991b1b, // Dark red
  I: 0x7c3aed, // Purple
};

const ELEMENT_RADII: Record<string, number> = {
  H: 0.31,
  C: 0.76,
  N: 0.71,
  O: 0.66,
  F: 0.57,
  P: 1.07,
  S: 1.05,
  Cl: 1.02,
  Br: 1.20,
  I: 1.39,
};

const ELEMENT_ELECTRONEGATIVITY: Record<string, number> = {
  H: 2.20,
  C: 2.55,
  N: 3.04,
  O: 3.44,
  F: 3.98,
  P: 2.19,
  S: 2.58,
  Cl: 3.16,
  Br: 2.96,
  I: 2.66,
};

interface HoveredAtomInfo {
  id: string;
  element: string;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
}

export const MolecularViewer3D: React.FC<MolecularViewer3DProps> = ({
  molecule,
  displayMode = '3d-ball-and-stick',
  autoRotate = true,
  onAtomSelect,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotating, setRotating] = useState(autoRotate);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredAtom, setHoveredAtom] = useState<HoveredAtomInfo | null>(null);
  const [selectedAtoms, setSelectedAtoms] = useState<Array<{ id: string; element: string; x: number; y: number; z: number }>>([]);
  const [measureMode, setMeasureMode] = useState<'inspect' | 'distance' | 'angle'>('inspect');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const atomMeshesRef = useRef<THREE.Mesh[]>([]);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Compute measurement metrics
  const distanceValue =
    selectedAtoms.length >= 2
      ? Math.sqrt(
          Math.pow(selectedAtoms[0].x - selectedAtoms[1].x, 2) +
          Math.pow(selectedAtoms[0].y - selectedAtoms[1].y, 2) +
          Math.pow(selectedAtoms[0].z - selectedAtoms[1].z, 2)
        ).toFixed(3)
      : null;

  const angleValue =
    selectedAtoms.length >= 3
      ? (() => {
          const a = selectedAtoms[0];
          const b = selectedAtoms[1]; // Vertex
          const c = selectedAtoms[2];
          const v1 = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
          const v2 = new THREE.Vector3(c.x - b.x, c.y - b.y, c.z - b.z);
          const angleRad = v1.angleTo(v2);
          return ((angleRad * 180) / Math.PI).toFixed(2);
        })()
      : null;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 14;
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 0.45);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    // Main Molecule Object Group
    const molGroup = new THREE.Group();
    groupRef.current = molGroup;
    scene.add(molGroup);

    // Build Atoms
    const atomMap = new Map<string, THREE.Vector3>();
    const atomMeshes: THREE.Mesh[] = [];

    molecule.atoms.forEach((atom) => {
      const radius =
        displayMode === '3d-space-filling'
          ? (ELEMENT_RADII[atom.element] || 0.7) * 1.2
          : 0.42;
      const isWire = displayMode === '3d-wireframe';

      const geometry = new THREE.SphereGeometry(radius, isWire ? 12 : 24, isWire ? 8 : 24);
      const color = ELEMENT_COLORS[atom.element] || 0x64748b;
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.15,
        wireframe: isWire,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(atom.x, atom.y, atom.z);
      sphere.userData = {
        id: atom.id,
        element: atom.element,
        x: atom.x,
        y: atom.y,
        z: atom.z,
      };

      molGroup.add(sphere);
      atomMeshes.push(sphere);
      atomMap.set(atom.id, new THREE.Vector3(atom.x, atom.y, atom.z));

      // If atom is selected, render an emissive halo ring
      const isSelected = selectedAtoms.some((sa) => sa.id === atom.id);
      if (isSelected) {
        const haloGeom = new THREE.SphereGeometry(radius * 1.25, 16, 16);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
        const halo = new THREE.Mesh(haloGeom, haloMat);
        halo.position.set(atom.x, atom.y, atom.z);
        molGroup.add(halo);
      }
    });

    atomMeshesRef.current = atomMeshes;

    // Build Bonds (in stick and wireframe modes)
    if (displayMode !== '3d-space-filling') {
      molecule.bonds.forEach((bond) => {
        const v1 = atomMap.get(bond.source);
        const v2 = atomMap.get(bond.target);
        if (v1 && v2) {
          const distance = v1.distanceTo(v2);
          const cylinderGeom = new THREE.CylinderGeometry(0.12, 0.12, distance, 16);
          const bondMat = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.4,
            wireframe: displayMode === '3d-wireframe',
          });
          const cylinder = new THREE.Mesh(cylinderGeom, bondMat);

          const midPoint = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
          cylinder.position.copy(midPoint);

          const direction = new THREE.Vector3().subVectors(v2, v1).normalize();
          const orientation = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
          );
          cylinder.quaternion.copy(orientation);

          molGroup.add(cylinder);
        }
      });
    }

    // Measurement Visual Guide: Render dashed line if 2 atoms selected
    if (selectedAtoms.length >= 2) {
      const p1 = new THREE.Vector3(selectedAtoms[0].x, selectedAtoms[0].y, selectedAtoms[0].z);
      const p2 = new THREE.Vector3(selectedAtoms[1].x, selectedAtoms[1].y, selectedAtoms[1].z);
      const lineGeom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0x38bdf8,
        dashSize: 0.3,
        gapSize: 0.15,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      line.computeLineDistances();
      molGroup.add(line);

      // If 3 atoms selected, add second line from b to c
      if (selectedAtoms.length >= 3) {
        const p3 = new THREE.Vector3(selectedAtoms[2].x, selectedAtoms[2].y, selectedAtoms[2].z);
        const line2Geom = new THREE.BufferGeometry().setFromPoints([p2, p3]);
        const line2 = new THREE.Line(line2Geom, lineMat);
        line2.computeLineDistances();
        molGroup.add(line2);
      }
    }

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (groupRef.current && rotating) {
        groupRef.current.rotation.y += 0.004;
        groupRef.current.rotation.x += 0.0015;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [molecule, displayMode, rotating, selectedAtoms]);

  // Raycaster helper
  const getIntersectedAtom = (e: React.MouseEvent) => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const intersects = raycaster.intersectObjects(atomMeshesRef.current);
    if (intersects.length > 0 && intersects[0].object.userData?.id) {
      return {
        atom: intersects[0].object.userData,
        screenX: e.clientX - rect.left,
        screenY: e.clientY - rect.top,
      };
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && groupRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;
      dragDistanceRef.current += Math.abs(deltaX) + Math.abs(deltaY);

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x += deltaY * 0.01;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }

    // Raycast for hover state
    const hit = getIntersectedAtom(e);
    if (hit) {
      setHoveredAtom({
        id: hit.atom.id,
        element: hit.atom.element,
        x: hit.atom.x,
        y: hit.atom.y,
        z: hit.atom.z,
        screenX: hit.screenX,
        screenY: hit.screenY,
      });
    } else {
      setHoveredAtom(null);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const wasClick = dragDistanceRef.current < 5;
    isDraggingRef.current = false;

    if (wasClick) {
      const hit = getIntersectedAtom(e);
      if (hit) {
        const atomData = hit.atom as AtomDataPoint;
        if (measureMode === 'inspect') {
          setSelectedAtoms([atomData]);
          onAtomSelect?.(atomData);
        } else if (measureMode === 'distance') {
          // Select up to 2 atoms
          setSelectedAtoms((prev) => {
            const exists = prev.some((a) => a.id === atomData.id);
            if (exists) return prev.filter((a) => a.id !== atomData.id);
            if (prev.length >= 2) return [prev[1], atomData];
            return [...prev, atomData];
          });
        } else if (measureMode === 'angle') {
          // Select up to 3 atoms
          setSelectedAtoms((prev) => {
            const exists = prev.some((a) => a.id === atomData.id);
            if (exists) return prev.filter((a) => a.id !== atomData.id);
            if (prev.length >= 3) return [prev[1], prev[2], atomData];
            return [...prev, atomData];
          });
        }
      }
    }
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const newZ = Math.max(5, Math.min(28, cameraRef.current.position.z + delta));
    cameraRef.current.position.z = newZ;
    setZoomLevel(Number(((30 - newZ) / 10).toFixed(1)));
  };

  const resetView = () => {
    if (!groupRef.current || !cameraRef.current) return;
    groupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.z = 14;
    setZoomLevel(1);
    setSelectedAtoms([]);
    setHoveredAtom(null);
  };

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-xl bg-surface-container-low overflow-hidden border border-surface-container-high flex flex-col justify-between select-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 chem-grid-pattern pointer-events-none opacity-40" />

      {/* Top Floating Control Ribbon */}
      <div className="relative z-10 p-space-md flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur text-on-surface font-code-sm text-code-sm font-semibold shadow-xs">
            {molecule.name} • {molecule.formula}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[11px] font-bold">
            {molecule.atoms.length} Atoms / {molecule.bonds.length} Bonds
          </span>
        </div>

        {/* Mode & Action Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-surface-container-lowest/90 backdrop-blur p-1 rounded-xl shadow-xs border border-surface-container-high">
          {/* Tool Selector */}
          <button
            onClick={() => {
              setMeasureMode('inspect');
              setSelectedAtoms([]);
            }}
            className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              measureMode === 'inspect'
                ? 'bg-primary-container text-on-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title="Inspect Atom Properties"
          >
            <span className="material-symbols-outlined text-[15px]">touch_app</span>
            <span>Inspect</span>
          </button>
          <button
            onClick={() => {
              setMeasureMode('distance');
              setSelectedAtoms([]);
            }}
            className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              measureMode === 'distance'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title="Measure Distance between 2 atoms"
          >
            <span className="material-symbols-outlined text-[15px]">straighten</span>
            <span>Distance</span>
          </button>
          <button
            onClick={() => {
              setMeasureMode('angle');
              setSelectedAtoms([]);
            }}
            className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              measureMode === 'angle'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title="Measure Bond Angle across 3 atoms"
          >
            <span className="material-symbols-outlined text-[15px]">architecture</span>
            <span>Angle</span>
          </button>

          <div className="w-px h-4 bg-surface-container-high mx-0.5" />

          {/* Auto rotate & reset */}
          <button
            onClick={() => setRotating(!rotating)}
            className={`p-1.5 rounded-lg text-body-sm transition-all ${
              rotating
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
            title="Toggle Continuous Auto-Rotation"
          >
            <span className="material-symbols-outlined text-[17px]">
              {rotating ? 'sync' : 'sync_disabled'}
            </span>
          </button>
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            title="Reset Conformation Camera"
          >
            <span className="material-symbols-outlined text-[17px]">restart_alt</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full flex-1 cursor-grab active:cursor-grabbing z-0 relative"
      />

      {/* Real-time Hover HUD Tooltip */}
      {hoveredAtom && (
        <div
          style={{
            left: Math.min(hoveredAtom.screenX + 16, 450),
            top: Math.max(hoveredAtom.screenY - 50, 60),
          }}
          className="absolute z-20 pointer-events-none bg-slate-900/90 text-white backdrop-blur-md px-3 py-2 rounded-lg shadow-lg border border-slate-700 font-mono text-xs flex flex-col gap-0.5 transition-all"
        >
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <span>Atom {hoveredAtom.id} ({hoveredAtom.element})</span>
            <span className="text-[10px] text-slate-300">
              r = {ELEMENT_RADII[hoveredAtom.element] || 0.7} Å
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            Coords: ({hoveredAtom.x.toFixed(2)}, {hoveredAtom.y.toFixed(2)}, {hoveredAtom.z.toFixed(2)}) Å
          </div>
          <div className="text-[10px] text-slate-400">
            Pauling Electronegativity: {ELEMENT_ELECTRONEGATIVITY[hoveredAtom.element] || 'N/A'}
          </div>
        </div>
      )}

      {/* Bottom Floating Bar with Active Measurement Display & Zoom Controls */}
      <div className="relative z-10 p-space-md flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Active Measurement Badge */}
        <div className="pointer-events-auto">
          {measureMode === 'distance' && (
            <div className="bg-surface-container-lowest/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-secondary/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[16px]">straighten</span>
              <span className="font-label-sm text-xs text-on-surface">
                {selectedAtoms.length < 2
                  ? `Select ${2 - selectedAtoms.length} more atom(s)`
                  : `Distance (${selectedAtoms[0].element}-${selectedAtoms[1].element}): ${distanceValue} Å`}
              </span>
              {selectedAtoms.length > 0 && (
                <button
                  onClick={() => setSelectedAtoms([])}
                  className="text-xs text-outline hover:text-on-surface ml-1 underline"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {measureMode === 'angle' && (
            <div className="bg-surface-container-lowest/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-secondary/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[16px]">architecture</span>
              <span className="font-label-sm text-xs text-on-surface">
                {selectedAtoms.length < 3
                  ? `Select ${3 - selectedAtoms.length} more atom(s) (Atom 2 = vertex)`
                  : `Bond Angle (${selectedAtoms[0].element}-${selectedAtoms[1].element}-${selectedAtoms[2].element}): ${angleValue}°`}
              </span>
              {selectedAtoms.length > 0 && (
                <button
                  onClick={() => setSelectedAtoms([])}
                  className="text-xs text-outline hover:text-on-surface ml-1 underline"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {measureMode === 'inspect' && selectedAtoms.length > 0 && (
            <div className="bg-surface-container-lowest/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-surface-container-high flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-code-sm text-xs text-on-surface font-semibold">
                Selected: {selectedAtoms[0].element} ({selectedAtoms[0].id}) at ({selectedAtoms[0].x.toFixed(2)}, {selectedAtoms[0].y.toFixed(2)}, {selectedAtoms[0].z.toFixed(2)}) Å
              </span>
              <button
                onClick={() => setSelectedAtoms([])}
                className="text-xs text-outline hover:text-on-surface ml-1 underline"
              >
                Deselect
              </button>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 pointer-events-auto bg-surface-container-lowest/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-surface-container-high">
          <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">
            Zoom
          </span>
          <button
            onClick={() => handleZoom(-1.5)}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
          <span className="font-code-sm text-[11px] text-on-surface w-8 text-center font-bold">
            {zoomLevel}x
          </span>
          <button
            onClick={() => handleZoom(1.5)}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

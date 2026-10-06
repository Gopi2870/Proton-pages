import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MoleculeData } from '../../../types/chemistry';

interface MolecularViewer3DProps {
  molecule: MoleculeData;
  displayMode: '3d-ball-and-stick' | '3d-space-filling' | '2d-skeletal';
  autoRotate?: boolean;
}

const ELEMENT_COLORS: Record<string, number> = {
  C: 0x334155, // Dark slate
  H: 0xe2e8f0, // White / light gray
  O: 0xef4444, // Red
  N: 0x2563eb, // Cobalt blue
  P: 0xf97316, // Orange
  S: 0xeab308, // Yellow
  Cl: 0x10b981, // Emerald green
  F: 0x06b6d4, // Cyan
  Br: 0x991b1b, // Dark red
  I: 0x7c3aed, // Purple
};

export const MolecularViewer3D: React.FC<MolecularViewer3DProps> = ({
  molecule,
  displayMode,
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotating, setRotating] = useState(autoRotate);
  const [zoomLevel, setZoomLevel] = useState(1);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x60a5fa, 0.4);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    // Molecule Object Group
    const molGroup = new THREE.Group();
    groupRef.current = molGroup;
    scene.add(molGroup);

    // Atoms
    const atomMap = new Map<string, THREE.Vector3>();

    molecule.atoms.forEach((atom) => {
      const radius = displayMode === '3d-space-filling' ? 0.9 : 0.42;
      const geometry = new THREE.SphereGeometry(radius, 24, 24);
      const color = ELEMENT_COLORS[atom.element] || 0x64748b;
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.1,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(atom.x, atom.y, atom.z);
      molGroup.add(sphere);
      atomMap.set(atom.id, new THREE.Vector3(atom.x, atom.y, atom.z));
    });

    // Bonds (only in ball-and-stick mode)
    if (displayMode === '3d-ball-and-stick') {
      molecule.bonds.forEach((bond) => {
        const v1 = atomMap.get(bond.source);
        const v2 = atomMap.get(bond.target);
        if (v1 && v2) {
          const distance = v1.distanceTo(v2);
          const cylinderGeom = new THREE.CylinderGeometry(0.12, 0.12, distance, 16);
          const bondMat = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.4,
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

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (groupRef.current && rotating) {
        groupRef.current.rotation.y += 0.005;
        groupRef.current.rotation.x += 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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
  }, [molecule, displayMode, rotating]);

  // Mouse drag Orbit Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !groupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    groupRef.current.rotation.y += deltaX * 0.01;
    groupRef.current.rotation.x += deltaY * 0.01;

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const newZ = Math.max(6, Math.min(26, cameraRef.current.position.z + delta));
    cameraRef.current.position.z = newZ;
    setZoomLevel(Number(((30 - newZ) / 10).toFixed(1)));
  };

  const resetView = () => {
    if (!groupRef.current || !cameraRef.current) return;
    groupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.z = 14;
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl bg-surface-container-low overflow-hidden border border-surface-container-high flex flex-col justify-between select-none">
      {/* Background Alignment Grid */}
      <div className="absolute inset-0 chem-grid-pattern pointer-events-none opacity-40" />

      {/* Top Overlay Stats */}
      <div className="relative z-10 p-space-md flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur text-on-surface font-code-sm text-code-sm font-semibold shadow-xs">
            {molecule.name} • {molecule.formula}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[11px] font-bold">
            {molecule.atoms.length} Atoms / {molecule.bonds.length} Bonds
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setRotating(!rotating)}
            className={`p-1.5 rounded-lg text-body-sm transition-all shadow-xs ${
              rotating
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            }`}
            title="Toggle Continuous Auto-Rotation"
          >
            <span className="material-symbols-outlined text-[18px]">
              {rotating ? 'sync' : 'sync_disabled'}
            </span>
          </button>
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface transition-colors shadow-xs"
            title="Reset Conformation Camera"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full flex-1 cursor-grab active:cursor-grabbing z-0"
      />

      {/* Bottom Floating Control Bar */}
      <div className="relative z-10 p-space-md flex flex-wrap items-center justify-between gap-2 pointer-events-none">
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

        <div className="flex items-center gap-2 pointer-events-auto bg-surface-container-lowest/90 backdrop-blur px-3 py-1.5 rounded-xl shadow-sm border border-surface-container-high">
          <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">
            Shaders:
          </span>
          <span className="font-code-sm text-[11px] text-primary font-bold">
            PBR Phong Specular • 60 FPS
          </span>
        </div>
      </div>
    </div>
  );
};

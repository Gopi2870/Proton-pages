"""
GitHub Pull Request Manager for Proton Pages.
Uses Git Credential Manager OAuth token to query, create, and manage genuine GitHub PRs.
"""
import subprocess
import urllib.request
import urllib.error
import json
import sys


def get_github_token() -> str:
    proc = subprocess.run(
        ["git", "credential", "fill"],
        input="protocol=https\nhost=github.com\n",
        capture_output=True,
        text=True,
        check=True,
    )
    for line in proc.stdout.splitlines():
        if line.startswith("password="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError("Could not retrieve GitHub token from git credential manager")


def api_request(path: str, method: str = "GET", data: dict = None) -> dict:
    token = get_github_token()
    url = f"https://api.github.com/repos/Gopi2870/Proton-pages{path}"
    headers = {
        "User-Agent": "ProtonPagesAgent",
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
    }
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            return json.loads(content) if content else {}
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"HTTPError {e.code} on {method} {path}: {error_body}", file=sys.stderr)
        raise


def list_all_prs():
    prs = api_request("/pulls?state=all&per_page=100")
    print(f"Total Remote PRs: {len(prs)}")
    for p in prs:
        print(f"PR #{p['number']}: {p['title']} [{p['state']}] -> head: {p['head']['ref']}")
    return prs


def create_pr(title: str, head_branch: str, base_branch: str = "main", body: str = ""):
    payload = {
        "title": title,
        "head": head_branch,
        "base": base_branch,
        "body": body,
    }
    res = api_request("/pulls", method="POST", data=payload)
    print(f"SUCCESS: Created PR #{res['number']}: {res['html_url']}")
    return res


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "list":
        list_all_prs()
    elif len(sys.argv) > 3 and sys.argv[1] == "create":
        create_pr(title=sys.argv[2], head_branch=sys.argv[3])
    else:
        list_all_prs()

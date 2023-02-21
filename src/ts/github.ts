export async function getGithubRepository(repo: string) {
  const res = await fetch("https://api.github.com/repos/" + repo);
  return await res.json();
}

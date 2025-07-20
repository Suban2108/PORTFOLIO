// Define LeetCodeStat type
interface LeetCodeStat {
  difficulty: string;
  count: number;
}

export async function fetchLeetCodeStats(username: string) {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username },
    }),
    next: { revalidate: 1800 }, // Revalidate every 1 hour (Next.js cache)
  });

  const data = await res.json();
  const stats = data.data?.matchedUser?.submitStats?.acSubmissionNum;

  if (!stats) return null;

  return {
    totalSolved: stats.find((d: LeetCodeStat) => d.difficulty === 'All')?.count || 0,
    easy: stats.find((d: LeetCodeStat) => d.difficulty === 'Easy')?.count || 0,
    medium: stats.find((d: LeetCodeStat) => d.difficulty === 'Medium')?.count || 0,
    hard: stats.find((d: LeetCodeStat) => d.difficulty === 'Hard')?.count || 0,
  };
}

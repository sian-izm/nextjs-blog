import utilStyles from "../styles/utils.module.css"
import { Octokit } from '@octokit/rest'

export default function GithubIssues() {
  const octokit = new Octokit();
  return (
    <section className={`${utilStyles.heading} ${utilStyles.padding1px}`}>
      {octokit
        .paginate('GET /repos/:owner/:repo/issues', {
          owner: 'octokit',
          repo: 'rest.js',
          state: 'open',
          per_page: 100,
        })
        .then(issues => {
          for (const issue of issues) {
            console.log('hugahuga');
            // <li className={utilStyles.listItem} key={issue.number}>
            //   <h3>{issue.title}</h3>
            // </li>
          }
       })}
    </section>
  )
}

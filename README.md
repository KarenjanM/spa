# Saleor



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/lucasKO2810/saleor.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/lucasKO2810/saleor/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
SPEC - Saleor Powered E-Commerce

## Description
This is an ECommerce based on Saleor API.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Setup
# Dev Setup

Your first step is to setup Saleor itself.

## Saleor

To run **Saleor** on your local machine you need to follow these instructions: 

- You need to have installed [**Docker**](https://www.docker.com) and Docker Compose and then build an image of the Saleor project:

```bash
**cd saleor-platform
docker-compose build**
```

> You need also to make sure, that <path_to_working_directory>/saleor-platform is in the list of shared directories in Docker(*Settings* -> *Shared Drives* or *Preferences* -> *Resources* -> *File sharing*) and you have dedicated at least 5 GB of memory(*Settings* -> *Advanced* or *Preferences* -> *Resources* -> *Advanced)*
> 
- Apply all migrations

```bash
docker-compose run --rm api python3 [manage.py](http://manage.py/) migrate
```

- Collect static files

```bash
docker-compose run --rm api python3 manage.py collectstatic --noinput
```

- Populate the database with example data and create the admin user:

```bash
docker-compose run --rm api python3 manage.py populatedb --createsuperuser  
```

> Note💡:  **populatedb** is optional and is advised if you need some test data when developing
> 
- Run the app:

```bash
docker-compose up
```

- Alternative( if you need only api and dashboard):

```bash
docker-compose up api worker
```

After you had your **Saleor** set up you can start testing if you did all correct by going on http://localhost:8000. 
Here you can find all three components of **Saleor** service:

- Dashboard
- Storefront( basically just a a front-end template )

> You will have later an opportunity to bind your own front-end
> 
- GraphQL Playground(DEBUG=True)

> 💡 In my opinion can be a very good of a tool when testing your requests onto the back-end and even just writing your requests
> 

## Frontend

All you need to do when launching frontend is following:

- Install all dependencies(if you are in **spec** folder):

```bash
cd saleor-platform/frontend
npm install
```

- Run the application:

```bash
npm run dev
```

Then you can easily access the frontend application and develop fast. 

# Production Setup

There is a shell script **start_up.sh** **in spec folder which will do all the launching for you. Thus you need just to launch this script:

```bash
sudo sh start_up.sh
```

If you want to shut down the application there is another shell script:

```bash
sudo sh down.sh
```

That's it. You now can launch the application in all ways you may need 😁

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

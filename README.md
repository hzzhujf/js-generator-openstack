# generator-openstack

generator-openstack is OpenStack's JavaScript project templating and maintenance engine. It permits you to:

1. ...create a new OpenStack JavaScript project.
2. ...update an existing project with new settings, requirements, and tools.

## Quick Start

Creating and updating a project follows the exact same steps:

1. Prerequisites: `nodejs`, `npm`
2. `npm install -g yo generator-openstack`
3. `cd my_project_directory`
4. `yo openstack`

The generator also provides a non-interactive mode: `yo openstack --non-interactive`



## Contributing

This project uses itself as a code management tool. In order to set up your environment for development, please follow these steps:

1. Prerequisites: `nodejs`, `npm`, `git`, `git review`
2. `npm install -g yo`
3. `git clone git://git.openstack.org/openstack/js-generator-openstack`
4. `cd js-generator-openstack`
5. `npm install`
8. `git review -s`

This should set up your project directory and make it ready for development.

### Some useful development commands

* `npm link` - Link this project into your global npm runtime. This allows you to run the project (via `yo openstack`) as if it was installed via `npm install -g`
* `npm test` - Run all the tests.
* `npm run lint` - Perform a linting check.

## TODO List

Looking for something to add? Here's a quick checklist:

* Prompt user for the project name, and make it accessible to all submodules.
* Choose the type of project they'd like to generate: Library, Web UI, or CLI Node App
  * Basic project setup for these different types will also be needed.
* package.json creation and maintenance
* Ensure that license is persisted into package.json
* dependency propagation from global requirements
* CLI documentation for `--non-interactive`

## Project Resources

  - [Source code](https://git.openstack.org/cgit/openstack/js-generator-openstack)
  - [Code review](https://review.openstack.org/#/admin/projects/openstack-infra/js-generator-openstack)
  - [Storyboard](https://storyboard.openstack.org/#!/project/842)

## Workflow

  - [How to contribute to OpenStack](http://docs.openstack.org/infra/manual/developers.html)
  - [Code reviews workflow](http://docs.openstack.org/infra/manual/developers.html#development-workflow)

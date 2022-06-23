# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide

#Prerequisits

Runing Hana instance
Open a new terminal and run `cf login --sso`
Login with one time code

## Dependency instalation

Open a new terminal and run 
  `npm install`
  
  `npm install -g hana-cli`
  
  `hana-cli createModule`
  
  `cds add hana`

  `cds build`
  
  `cds deploy --to hana --auto-undeploy`
  
  `cds watch`


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

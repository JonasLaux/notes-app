# Terraform Configuration for Notes-App

This directory contains the Terraform configuration files for provisioning and managing the infrastructure required for the Notes-App on Google Cloud Platform.
## Structure 
- `/environments/production/vars.tfvars`: Production environment-specific variables. 
- `/modules`:  directory contains subdirectories for each module, each of which is responsible for a specific set of resources within the cloud environment
- `main.tf`: The main Terraform configuration file that may call various modules and set up providers. 
- `variables.tf`: Defines variables used across the Terraform configurations. 
- `versions.tf`: Specifies the required versions for Terraform and its providers. 
- `.env.template`: A template for an `.env` file that you can rename to `.env` and fill with your environment variables for local development. 
- `.gitlab-ci.yml`: The GitLab CI/CD pipeline configuration file. 
- `terraform.lock.hcl`: A lock file generated by Terraform to ensure consistent provider versions.
## Setup

To set up Terraform: 
1. Ensure you have Terraform installed. If you do not have Terraform installed, download it from the [Terraform website](https://www.terraform.io/downloads.html) . 
2. Initialize Terraform:

```sh
terraform init
```



This will install the necessary providers and modules.
1. To see the changes Terraform will perform, run:

```sh
terraform plan
```


1. To apply the configuration to your infrastructure, run:

```sh
terraform apply
```



For production environments, you should specify your tfvars file:

```sh
terraform apply -var-file="environments/production/vars.tfvars"
```


## Modules

The Terraform configuration is organized into modules to allow for reusable and maintainable code. The root of the Terraform configuration calls these modules as needed for different resources.
### IAM Module

The `iam` module is responsible for creating a service account with the necessary permissions to interact with Google Cloud Datastore.

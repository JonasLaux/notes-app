provider "google" {
  project = var.project_id
}

module "iam" {
  source = "./modules/iam"

  project_id            = var.project_id
  service_account_name  = var.service_account_name
}

provider "google" {
  project = var.project_id
}

resource "google_service_account" "default" {
  project      = var.project_id
  account_id   = var.service_account_name
  display_name = "Service Account for Datastore Access"
}

resource "google_project_iam_member" "datastore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.default.email}"
}

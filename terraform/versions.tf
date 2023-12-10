terraform {
  required_version = ">= 1.1.9"

  backend "http" {}

  required_providers {
    google = {
      source  = "hashicorp/google-beta"
      version = "4.80.0"
    }
  }
}

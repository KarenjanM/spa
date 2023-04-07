variable "gcp_region" {
  type = string
  description = "Region in EU that has GPU instances"
  default = "europe-west1-b"
}

# define GCP region
variable "gcp_region_1" {
  type = string
  description = "GCP region"
  default = "europe-west1"
}

# define GCP project id
variable "gcp_project_id" {
  type = string
  description = "GCP Project id"
  default = "saleor-382911"
}

# define GCP project id
variable "gcp_service_account_engine" {
  type = string
  description = "GCP compute engine service account"
  default = "compute-engine@saleor-382911.iam.gserviceaccount.com"
}

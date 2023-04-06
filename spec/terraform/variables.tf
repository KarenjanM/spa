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

# define GCP region
variable "gcp_project_id" {
  type = string
  description = "GCP Project id"
  default = ""
}

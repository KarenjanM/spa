terraform{
  required_providers{
    google = {
    }
  }
}

provider "google" {
  credentials = "${file("credentials.json")}"
  project     = "infrastructure-test-env"
  region      = var.gcp_region
  zone        = var.gcp_region
}

data "google_compute_zones" "available_zones" {}

data "template_file" "startup_script" {
  template = "${file("./startup_script.sh")}"
  vars = {
  }
}

resource "google_compute_instance" "gpu-vm" {
  count = 1
  name = "saleor"
  machine_type = "n1-standard-1" // 4 CPU 16 GB of RAM
  zone = var.gcp_region

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      size = 50 // 50 GB Storage
    }
   }

  tags = ["https-server","http-server"]

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.static.address
    }
  }

  scheduling{
    on_host_maintenance = "TERMINATE" // Need to terminate GPU on maintenance
  }

 metadata_startup_script = "${data.template_file.startup_script.rendered}"

  service_account {
  # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
  email  = "gcp-terraform-dl@infrastructure-test-env.iam.gserviceaccount.com"
  scopes = ["cloud-platform"]
  }
}

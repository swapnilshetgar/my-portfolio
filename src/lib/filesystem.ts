export interface FSFile {
  type: 'file';
  name: string;
  content: string;
  isBinary?: boolean;
}

export interface FSDirectory {
  type: 'dir';
  name: string;
  children: { [name: string]: FSNode };
}

export type FSNode = FSFile | FSDirectory;

export const virtualFS: FSDirectory = {
  type: 'dir',
  name: 'root',
  children: {
    home: {
      type: 'dir',
      name: 'home',
      children: {
        visitor: {
          type: 'dir',
          name: 'visitor',
          children: {
            Desktop: {
              type: 'dir',
              name: 'Desktop',
              children: {
                'About_Me.txt': {
                  type: 'file',
                  name: 'About_Me.txt',
                  content: 'DevOps / SRE / Multi-Cloud engineer passionate about automating everything, reducing toil, and building highly resilient distributed systems. Over 4 years of experience specializing in Linux internals, AWS/Azure/GCP architectures, Terraform Infrastructure as Code, Kubernetes orchestration, and comprehensive monitoring stacks. A firm believer in GitOps and zero-trust security layouts.'
                },
                'SRE_Dashboard.desktop': {
                  type: 'file',
                  name: 'SRE_Dashboard.desktop',
                  content: 'Type: Application\nName: SRE Dashboard\nExec: open monitoring'
                },
                'Terminal.desktop': {
                  type: 'file',
                  name: 'Terminal.desktop',
                  content: 'Type: Application\nName: Terminal\nExec: open terminal'
                }
              }
            },
            Projects: {
              type: 'dir',
              name: 'Projects',
              children: {
                'multicloud-infra.md': {
                  type: 'file',
                  name: 'multicloud-infra.md',
                  content: `# Multi-Cloud Infrastructure Provisioning\n\n**Tech Stack:** AWS (EC2, RDS, ALB, Auto Scaling), Azure (VMs, VNet), Terraform, GitHub Actions\n\n### Overview\nDesigned and implemented a highly resilient, cross-cloud deployment architecture using Terraform. It provisions secure, load-balanced, auto-scaling environments in both AWS and Azure. This setup guarantees high availability and facilitates seamless failover strategies.\n\n### Key Features\n- State files securely stored and locked using AWS S3 and DynamoDB backend.\n- Modular, reusable Terraform components for multi-region configurations.\n- Automated CI/CD deployment pipelines using GitHub Actions with dry-runs and plan inspections.\n\n### Challenges & Solutions\n- *Problem:* Subnet and network routing overlap in cross-cloud VPN peer connections.\n- *Solution:* Engineered strict network CIDR allocation sheets and automated route table configuration to prevent IP collisions across AWS and Azure.`
                },
                'monitoring-observability.md': {
                  type: 'file',
                  name: 'monitoring-observability.md',
                  content: `# Centralized Monitoring & Observability Stack\n\n**Tech Stack:** Prometheus, Grafana, Node Exporter, Alertmanager, Splunk/ELK\n\n### Overview\nDeployed a containerized monitoring architecture for a production Kubernetes cluster. This setup aggregates host, container, and application logs into a centralized dashboard, helping reduce MTTD by 60%.\n\n### Key Features\n- Real-time Prometheus metrics polling with custom node-level exporters.\n- Grafana dashboards with panels monitoring network latency, memory leaks, and CPU load spikes.\n- PagerDuty and Slack integrations in Alertmanager using custom severity matrices.\n- Log ingestion and search patterns configured via Splunk & ELK pipelines.\n\n### Challenges & Solutions\n- *Problem:* High metric cardinality bloating Prometheus memory storage.\n- *Solution:* Tuned metric scrape intervals, removed redundant label values, and set strict 14-day retention rules combined with Thanos for long-term cold storage.`
                },
                'automated-backup-system.md': {
                  type: 'file',
                  name: 'automated-backup-system.md',
                  content: `# Automated Backup & Disaster Recovery\n\n**Tech Stack:** Linux internals, Bash, cron, gzip, AWS S3, Azure Blob Storage\n\n### Overview\nCreated a robust, secure automated script suite running as root crontabs across critical server fleets. It regularly backs up configuration directories, active database dumps, and environment variables into isolated cloud vaults.\n\n### Key Features\n- Incremental backups utilizing standard GNU tar tools.\n- Automated GZIP compression and AES-256 client-side encryption.\n- Multi-region cloud replication targeting S3 Glacier with lifecycle expiration rules (90 days).\n- Periodic automated restore drills testing archive validation.\n\n### Challenges & Solutions\n- *Problem:* Network bandwidth saturation during peak-hour database backups.\n- *Solution:* Implemented token bucket rate-limiting in upload commands and scheduled cron jobs during off-peak windows.`
                },
                'network-hardening.md': {
                  type: 'file',
                  name: 'network-hardening.md',
                  content: `# Network Hardening & Zero-Trust Access\n\n**Tech Stack:** WireGuard VPN, Linux iptables/nftables, AWS Security Groups, IAM design\n\n### Overview\nRestructured corporate cloud networking layout to implement a zero-trust architecture. This project minimized external ingress endpoints, configured strict IAM controls, and isolated database clusters from public exposure.\n\n### Key Features\n- Configured WireGuard VPN jumpboxes as the single entrypoint for administrative access.\n- Hardened host level firewalls using nftables to drop unsolicited traffic by default.\n- Implemented dynamic security group definitions using Terraform.\n- Security audit reports compiled weekly for non-compliant ports.\n\n### Challenges & Solutions\n- *Problem:* Securely allowing external API hooks without exposing the entire cluster.\n- *Solution:* Implemented API gateways protected with Cloudflare Web Application Firewall (WAF) and tight security group rules restricted to Cloudflare IP ranges.`
                }
              }
            },
            Documents: {
              type: 'dir',
              name: 'Documents',
              children: {
                'contact_info.txt': {
                  type: 'file',
                  name: 'contact_info.txt',
                  content: 'Name: Swapnil\nRole: DevOps & SRE Engineer\nEmail: swapnil@example.com\nLinkedIn: https://linkedin.com/in/swapnil\nGitHub: https://github.com/swapnil\nPhone: +91 9999999999'
                },
                'welcome.txt': {
                  type: 'file',
                  name: 'welcome.txt',
                  content: 'Welcome to Swapnil\'s Portfolio OS!\nYou can interact with this machine using GUI double-clicks or using terminal commands. Type `help` in the terminal to view commands, or double-click icons to explore files and configurations.'
                }
              }
            },
            Resume: {
              type: 'dir',
              name: 'Resume',
              children: {
                'resume.pdf': {
                  type: 'file',
                  name: 'resume.pdf',
                  content: '[Binary File: PDF Resume Document - Type "resume" or double-click to download]',
                  isBinary: true
                }
              }
            },
            Certificates: {
              type: 'dir',
              name: 'Certificates',
              children: {
                'aws-solutions-architect.txt': {
                  type: 'file',
                  name: 'aws-solutions-architect.txt',
                  content: 'Credential: AWS Certified Solutions Architect - Associate\nProvider: Amazon Web Services\nVerify: https://aws.amazon.com/verification'
                },
                'cka-kubernetes.txt': {
                  type: 'file',
                  name: 'cka-kubernetes.txt',
                  content: 'Credential: Certified Kubernetes Administrator (CKA)\nProvider: The Linux Foundation\nVerify: https://verify.linuxfoundation.org'
                },
                'hashicorp-terraform.txt': {
                  type: 'file',
                  name: 'hashicorp-terraform.txt',
                  content: 'Credential: Terraform Associate\nProvider: HashiCorp\nVerify: https://credly.com/verify-terraform'
                }
              }
            },
            Cloud: {
              type: 'dir',
              name: 'Cloud',
              children: {
                aws: {
                  type: 'dir',
                  name: 'aws',
                  children: {
                    'credentials.txt': {
                      type: 'file',
                      name: 'credentials.txt',
                      content: '[default]\naws_access_key_id = AKIAIOSFODNN7EXAMPLE\naws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\nregion = us-east-1'
                    }
                  }
                },
                azure: {
                  type: 'dir',
                  name: 'azure',
                  children: {
                    'config.txt': {
                      type: 'file',
                      name: 'config.txt',
                      content: 'subscription_id = 8abc1234-def4-5678-abcd-ef0123456789\ntenant_id = 9def5678-abc1-2345-def6-7890abcdef12\nlocation = westeurope'
                    }
                  }
                },
                gcp: {
                  type: 'dir',
                  name: 'gcp',
                  children: {
                    'active-project.json': {
                      type: 'file',
                      name: 'active-project.json',
                      content: '{\n  "project_id": "swapnil-cloud-infrastructure",\n  "billing_enabled": true,\n  "preferred_zone": "asia-south1-a"\n}'
                    }
                  }
                }
              }
            },
            Scripts: {
              type: 'dir',
              name: 'Scripts',
              children: {
                'healthcheck.sh': {
                  type: 'file',
                  name: 'healthcheck.sh',
                  content: '#!/bin/bash\necho "Checking system metrics..."\ncpu_load=$(uptime | awk \'{print $10}\')\nram_free=$(free -m | grep Mem | awk \'{print $4}\')\necho "System Status: OK"\necho "CPU Load: $cpu_load"\necho "RAM Available: $ram_free MB"'
                },
                'matrix.sh': {
                  type: 'file',
                  name: 'matrix.sh',
                  content: '# Run matrix easter egg\nmatrix'
                }
              }
            },
            Monitoring: {
              type: 'dir',
              name: 'Monitoring',
              children: {
                'targets.yml': {
                  type: 'file',
                  name: 'targets.yml',
                  content: 'scrape_configs:\n  - job_name: "node-exporter"\n    static_configs:\n      - targets: ["localhost:9100", "aws-prod-web:9100"]\n  - job_name: "kubernetes-pods"\n    kubernetes_sd_configs:\n      - role: pod'
                }
              }
            },
            Logs: {
              type: 'dir',
              name: 'Logs',
              children: {
                'auth.log': {
                  type: 'file',
                  name: 'auth.log',
                  content: 'Jul  3 12:04:11 swapnil-dev sshd[2844]: Accepted password for visitor from 192.168.1.15 port 49302 ssh2\nJul  3 12:05:00 swapnil-dev sudo: visitor : TTY=pts/0 ; PWD=/home/visitor ; USER=root ; COMMAND=/bin/rm -rf /'
                },
                'syslog': {
                  type: 'file',
                  name: 'syslog',
                  content: 'Jul  3 12:00:01 swapnil-dev CRON[1924]: (root) CMD (/home/visitor/Scripts/healthcheck.sh > /dev/null)\nJul  3 12:01:45 swapnil-dev kubelet[540]: Bound pod: docker-operator-7c858df-xk2r\nJul  3 12:02:11 swapnil-dev dockerd[830]: Container 9aef89d12bc started'
                }
              }
            }
          }
        }
      }
    }
  }
};

// Helper function to resolve paths
export function resolvePath(currentPath: string, targetPath: string): string {
  if (targetPath === '~') return '/home/visitor';
  if (targetPath.startsWith('~/')) {
    return '/home/visitor/' + targetPath.substring(2);
  }
  
  let absolutePath = '';
  if (targetPath.startsWith('/')) {
    absolutePath = targetPath;
  } else {
    // Relative path
    absolutePath = currentPath + (currentPath.endsWith('/') ? '' : '/') + targetPath;
  }
  
  // Clean path (resolve "." and "..")
  const parts = absolutePath.split('/').filter(p => p !== '' && p !== '.');
  const stack: string[] = [];
  
  for (const part of parts) {
    if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  
  return '/' + stack.join('/');
}

// Find a node by absolute path
export function getNodeByPath(path: string): FSNode | null {
  if (path === '/') return virtualFS;
  const parts = path.split('/').filter(p => p !== '');
  let current: FSNode = virtualFS;
  
  for (const part of parts) {
    if (current.type !== 'dir') return null;
    const nextNode: FSNode | undefined = current.children[part];
    if (!nextNode) return null;
    current = nextNode;
  }
  
  return current;
}

// Generate text listing for a directory
export function getDirectoryListing(dir: FSDirectory): string {
  const keys = Object.keys(dir.children);
  if (keys.length === 0) return '';
  return keys.map((key) => {
    const node = dir.children[key];
    if (node.type === 'dir') {
      return `\u001b[1;34m${key}/\u001b[0m`; // ANSI blue for dirs
    }
    return key;
  }).join('   ');
}

// Generate ASCII tree for folder hierarchy
export function generateTree(node: FSNode, prefix = ''): string[] {
  let lines: string[] = [];
  if (node.type === 'dir') {
    const keys = Object.keys(node.children);
    keys.forEach((key, index) => {
      const child = node.children[key];
      const isLast = index === keys.length - 1;
      const marker = isLast ? '└── ' : '├── ';
      const nameStr = child.type === 'dir' ? `${key}/` : key;
      lines.push(`${prefix}${marker}${nameStr}`);
      if (child.type === 'dir') {
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');
        lines = lines.concat(generateTree(child, nextPrefix));
      }
    });
  }
  return lines;
}

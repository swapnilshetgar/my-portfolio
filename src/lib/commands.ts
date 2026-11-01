import { ThemeType } from '../store/useOSStore';
import { resolvePath, getNodeByPath, getDirectoryListing, generateTree, FSDirectory } from './filesystem';

export interface CommandResponse {
  output: string;
  action?: {
    type: 'clear' | 'matrix' | 'reboot' | 'shutdown' | 'theme' | 'open' | 'download_resume' | 'sudo_rm';
    value?: string;
  };
}

const FORTUNES = [
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "An SRE walks into a bar: 'Can I get a beer? How about now? How about now?' (Polling interval 1s)",
  "Kubernetes: The solution to all the problems you didn't have when you were running a single server.",
  "Terraform: Because manually clicking in the AWS Console is a sin.",
  "If it isn't in Git, it doesn't exist.",
  "A good DevOps engineer automates themselves out of a job, then gets hired to automate the next one.",
  "Linux is user-friendly. It's just very selective about who its friends are.",
  "DNS is always the culprit. Even when it isn't, it is.",
  "Uptime is temporary. Drift is inevitable. Terraform is eternal.",
  "What is the SRE way? Hope for the best, configure alerting for the worst."
];

// Helper to simulate SSH-like outputs
const getSshHeader = () => {
  return `Welcome to Swapnil's Portfolio OS v1.0.0 (Linux 6.8.0-generic x86_64)

 * Documentation:  https://github.com/swapnil
 * Management:     AWS / Azure / GCP
 * Support:        Active (Recruiter Priority Channel)

System status as of ${new Date().toLocaleString()}:
  System load:  0.08              Processes:             112
  Usage of /:   42.1% of 100GB    Users logged in:       1
  Memory usage: 45%               IP address for eth0:   10.0.0.42
  Swap usage:   0%

14 packages can be updated.
0 updates are security updates.

Last login: Fri Jul  3 12:00:00 2026 from 192.168.1.15
`;
};

export const executeCommand = (
  commandLine: string,
  currentDir: string,
  setCurrentDir: (dir: string) => void,
  theme: ThemeType,
  setTheme: (theme: ThemeType) => void
): CommandResponse => {
  const trimmed = commandLine.trim();
  if (!trimmed) return { output: '' };

  // Parse arguments (respecting quotes simple parser)
  const parts = trimmed.match(/[^"\s]+|"[^"]*"/g) || [];
  const cmd = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1).map(arg => arg.replace(/^"|"$/g, ''));

  switch (cmd) {
    case 'help': {
      return {
        output: `\u001b[1;32mPortfolio OS — Available Commands\u001b[0m

\u001b[1;36mCore/Navigation:\u001b[0m
  help             Display this help summary
  clear            Clear the screen (Ctrl+L)
  history          Display command history
  pwd              Print working directory
  ls [path]        List directory contents
  cd [path]        Change directory
  tree             Show recursive directory layout
  date / time      Show current timestamp
  uptime           Display portfolio operational uptime
  hostname         Print system hostname
  whoami           Show current logged-in identity

\u001b[1;36mContent Commands:\u001b[0m
  about            Print 'About Me' bio
  skills           Show professional competencies
  experience       List professional roles and timeline
  education        Show academic background
  certifications   Show active cloud & network certifications
  projects         List engineering projects
  cat <file>       Display file contents
  resume           Download PDF Resume
  contact          Show email, LinkedIn, and GitHub
  social           Direct links to networking profiles

\u001b[1;36mDevOps/Network/SRE Tools:\u001b[0m
  neofetch         Custom ASCII system info panel
  systemctl status portfolio   Check portfolio service status
  kubectl get pods Show virtual orchestration pods
  ping <host>      Simulate latency checks (e.g. ping recruiter.com)
  traceroute <h>   Simulate networking hops to career milestones
  top / htop       Display resource usages
  aws sts get-caller-identity  Print fake AWS credentials
  terraform plan   Show Terraform provisioning plan

\u001b[1;36mEaster Eggs & Fun:\u001b[0m
  fortune          Display a random DevOps quote
  matrix           Start Matrix rain overlay (matrix off to stop)
  theme <name>     Switch active visual theme
  sudo <cmd>       Request administrative privileges
  reboot           Reboot the OS experience
  shutdown         Power off the virtual screen
`
      };
    }

    case 'clear':
      return { output: '', action: { type: 'clear' } };

    case 'pwd':
      return { output: currentDir };

    case 'ls': {
      const target = args[0] || '.';
      const absPath = resolvePath(currentDir, target);
      const node = getNodeByPath(absPath);

      if (!node) {
        return { output: `ls: cannot access '${target}': No such file or directory` };
      }
      if (node.type === 'file') {
        return { output: node.name };
      }
      return { output: getDirectoryListing(node) };
    }

    case 'cd': {
      const target = args[0] || '~';
      const absPath = resolvePath(currentDir, target);
      const node = getNodeByPath(absPath);

      if (!node) {
        return { output: `-bash: cd: ${target}: No such file or directory` };
      }
      if (node.type === 'file') {
        return { output: `-bash: cd: ${target}: Not a directory` };
      }
      setCurrentDir(absPath);
      return { output: '' };
    }

    case 'tree': {
      const node = getNodeByPath(currentDir);
      if (!node || node.type !== 'dir') return { output: '.' };
      const lines = generateTree(node);
      return { output: `.\n${lines.join('\n')}` };
    }

    case 'date':
    case 'time':
      return { output: new Date().toString() };

    case 'uptime': {
      // Calculate uptime based on some static starting date in the past
      const startDate = new Date('2026-06-01T00:00:00');
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return { output: `up ${diffDays} days, ${hours} hours, 14 minutes, load average: 0.05, 0.08, 0.12` };
    }

    case 'hostname':
      return { output: 'swapnil-dev' };

    case 'whoami':
      return { output: 'visitor' };

    case 'history':
      return { output: 'Use Up/Down arrows to navigate through the history buffer.' };

    case 'about': {
      const aboutNode = getNodeByPath('/home/visitor/Desktop/About_Me.txt');
      return { output: aboutNode && aboutNode.type === 'file' ? aboutNode.content : 'DevOps / SRE Engineer' };
    }

    case 'skills': {
      return {
        output: `\u001b[1;32m=== PROFESSIONAL SKILLS MATRIX ===\u001b[0m

\u001b[1;36mOperating Systems:\u001b[0m        Linux (Ubuntu, RHEL, CentOS), Windows Server, Unix
\u001b[1;36mCloud Platforms:\u001b[0m          AWS, Azure, GCP
\u001b[1;36mIaC & Automation:\u001b[0m         Terraform, Ansible, Bash, Python, CloudFormation
\u001b[1;36mContainers & K8s:\u001b[0m         Docker, Kubernetes, Helm Charts
\u001b[1;36mCI/CD Pipelines:\u001b[0m          GitHub Actions, Jenkins, GitLab CI
\u001b[1;36mObservability:\u001b[0m            Prometheus, Grafana, ELK Stack, Splunk, CloudWatch
\u001b[1;36mNetworking:\u001b[0m               TCP/IP, DNS, VPN (WireGuard), Firewalls, Load Balancers
\u001b[1;36mDatabases:\u001b[0m                PostgreSQL, MySQL, Oracle SQL
\u001b[1;36mSupport & Ticketing:\u001b[0m      Jira, ServiceNow, Incident/Problem management (ITIL)`
      };
    }

    case 'education': {
      return {
        output: `\u001b[1;32m=== EDUCATION ===\u001b[0m

\u001b[1;36mBachelor of Engineering in Computer Science\u001b[0m
  CGPA: 8.5/10
  Timeline: 2019 - 2023
  Key Focus: Computer Networks, Operating Systems, Database Management Systems, Distributed Systems.`
      };
    }

    case 'experience': {
      return {
        output: `\u001b[1;32m=== PROFESSIONAL EXPERIENCE ===\u001b[0m

\u001b[1;36mCloud Infrastructure Engineer | Global Tech Solutions\u001b[0m
  *Timeline: June 2024 - Present*
  - Engineered Terraform modules to provision multi-region AWS and Azure environments.
  - Deployed Prometheus & Grafana stacks, reducing incident detection time (MTTD) by 40%.
  - Managed Kubernetes clusters, optimizing resource limits to reduce monthly cloud spend by 18%.
  - Maintained CI/CD pipelines in GitHub Actions, slashing deploy times by half.

\u001b[1;36mAssociate SRE (Internship) | CloudScale Systems\u001b[0m
  *Timeline: Jan 2023 - Dec 2023*
  - Automated weekly database backups and cron-based log rotation scripts.
  - Troubleshooting server performance, fixing high-memory load spikes on Linux node clusters.
  - Implemented network hardening policies and restricted ingress ports via Security Groups.`
      };
    }

    case 'certifications': {
      return {
        output: `\u001b[1;32m=== CLOUD & NETWORKING CERTIFICATIONS ===\u001b[0m

[ CKA ]  Certified Kubernetes Administrator - Linux Foundation
[ AWS ]  AWS Certified Solutions Architect - Associate
[ HASH]  HashiCorp Certified Terraform Associate
[ AZUR]  Microsoft Certified: Azure Fundamentals (AZ-900)

*Type 'cat Certificates/<filename>.txt' to read credential validation details.*`
      };
    }

    case 'projects': {
      return {
        output: `\u001b[1;32m=== COMPLETED ENGINEERING PROJECTS ===\u001b[0m

1. \u001b[1;36mmulticloud-infra.md\u001b[0m          Cross-cloud Terraform architectures (AWS/Azure)
2. \u001b[1;36mmonitoring-observability.md\u001b[0m  Centralized Prometheus/Grafana logging pipeline
3. \u001b[1;36mautomated-backup-system.md\u001b[0m   Secure encrypted Bash cloud replica backup cron
4. \u001b[1;36mnetwork-hardening.md\u001b[0m          Zero-Trust access control topology & firewall rules

*Type 'cat Projects/<filename>' to read project architecture details.*`
      };
    }

    case 'cat': {
      if (args.length === 0) {
        return { output: 'cat: missing operand' };
      }
      const target = args[0];
      const absPath = resolvePath(currentDir, target);
      const node = getNodeByPath(absPath);

      if (!node) {
        return { output: `cat: ${target}: No such file or directory` };
      }
      if (node.type === 'dir') {
        return { output: `cat: ${target}: Is a directory` };
      }
      if (node.isBinary) {
        if (node.name.endsWith('.pdf')) {
          return {
            output: `Downloading ${node.name}...`,
            action: { type: 'download_resume' }
          };
        }
      }
      return { output: node.content };
    }

    case 'resume':
      return {
        output: 'Opening resume download channel...',
        action: { type: 'download_resume' }
      };

    case 'contact': {
      const contactNode = getNodeByPath('/home/visitor/Documents/contact_info.txt');
      return { output: contactNode && contactNode.type === 'file' ? contactNode.content : '' };
    }

    case 'social': {
      return {
        output: `\u001b[1;32m=== SOCIAL NETWORKS ===\u001b[0m
GitHub:    \u001b[4;34mhttps://github.com/swapnil\u001b[0m
LinkedIn:  \u001b[4;34mhttps://linkedin.com/in/swapnil\u001b[0m
Email:     \u001b[4;34mswapnil@example.com\u001b[0m`
      };
    }

    case 'neofetch': {
      const themeColors: { [key in ThemeType]: string } = {
        ubuntu: '\u001b[1;31m',
        kali: '\u001b[1;36m',
        dracula: '\u001b[1;35m',
        nord: '\u001b[1;34m',
        gruvbox: '\u001b[1;33m',
        catppuccin: '\u001b[1;34m',
        hacker: '\u001b[1;32m',
        light: '\u001b[1;30m'
      };
      
      const tc = themeColors[theme] || '\u001b[1;32m';
      const reset = '\u001b[0m';

      const ascii = `
${tc}       _.._${reset}          \u001b[1;32mvisitor\u001b[0m@\u001b[1;32mswapnil-dev\u001b[0m
${tc}     .' .-''\` ${reset}        -------------------
${tc}    /  /      ${reset}        OS: Portfolio OS v1.0 (Linux Distro)
${tc}   |  |       ${reset}        Host: swapnil-dev
${tc}   \\  \\       ${reset}        Kernel: 6.8.0-generic
${tc}    \\  \`---   ${reset}        Uptime: up 32 days, 4 hours
${tc}     \`.____.  ${reset}        Shell: bash 5.2.15
                      CPU: Problem Solving Unit (Octa-Core)
                      RAM: Active 45% (8GB allocated)
                      Cloud: AWS · Azure · GCP
                      Skills: K8s / Terraform / CI-CD / Bash
                      
                      \u001b[30m██\u001b[31m██\u001b[32m██\u001b[33m██\u001b[34m██\u001b[35m██\u001b[36m██\u001b[37m██\u001b[0m
`;
      return { output: ascii };
    }

    case 'systemctl': {
      if (args[0] === 'status' && args[1] === 'portfolio') {
        return {
          output: `● portfolio.service - Swapnil's Developer Portfolio OS
     Loaded: loaded (/etc/systemd/system/portfolio.service; enabled; vendor preset: enabled)
     Active: \u001b[1;32mactive (running)\u001b[0m since Mon 2026-06-01 00:00:00 UTC; 1 month ago
   Main PID: 42 (next-app)
      Tasks: 18 (limit: 4915)
     Memory: 256.0M
     CGroup: /system.slice/portfolio.service
             └─42 next-dev-server

Jul 03 12:00:01 swapnil-dev next-app[42]: Starting Next.js Production server...
Jul 03 12:00:02 swapnil-dev next-app[42]: Loading system themes and custom filesystem nodes...
Jul 03 12:00:03 swapnil-dev next-app[42]: Portfolio UI running successfully on port 3000.`
        };
      }
      return { output: 'Usage: systemctl status portfolio' };
    }

    case 'kubectl': {
      if (args[0] === 'get' && args[1] === 'pods') {
        return {
          output: `NAME                                READY   STATUS    RESTARTS   AGE
pod/kubernetes-cluster-operator     1/1     Running   0          32d
pod/terraform-engine-state-lock     1/1     Running   0          32d
pod/prometheus-node-exporter        1/1     Running   0          32d
pod/grafana-dashboard-render        1/1     Running   0          32d
pod/nginx-ingress-gateway-prod      1/1     Running   0          32d
pod/docker-registry-mirror          1/1     Running   0          32d`
        };
      }
      return { output: 'Usage: kubectl get pods' };
    }

    case 'ping': {
      if (args.length === 0) return { output: 'ping: missing host operand' };
      const host = args[0];
      return {
        output: `PING ${host} (104.26.10.224) 56(84) bytes of data.
64 bytes from ${host}: icmp_seq=1 ttl=56 time=18.4 ms
64 bytes from ${host}: icmp_seq=2 ttl=56 time=19.1 ms
64 bytes from ${host}: icmp_seq=3 ttl=56 time=18.0 ms
64 bytes from ${host}: icmp_seq=4 ttl=56 time=18.5 ms

--- ${host} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 18.04/18.51/19.12/0.41 ms -- always reliable.`
      };
    }

    case 'traceroute': {
      if (args.length === 0) return { output: 'traceroute: missing host operand' };
      return {
        output: `traceroute to career.dev (198.51.100.12), 30 hops max, 60 byte packets
 1  gateway.local (10.0.0.1)  1.025 ms  0.985 ms  1.102 ms
 2  isp-core-node.net (182.16.2.1)  4.230 ms  4.561 ms  4.402 ms [ISP Level Peer]
 3  bachelor-degree-cs.uni (192.168.10.1)  8.110 ms  8.402 ms  8.150 ms [Education Completed]
 4  cka-cert-verify.linux (192.168.12.5)  12.441 ms  12.802 ms  12.301 ms [Kubernetes CKA Cert]
 5  terraform-associate.hashicorp (192.168.15.8)  15.110 ms  14.982 ms  15.201 ms [IaC Associate Cert]
 6  cloudscale-systems-intern.net (172.16.4.10)  17.820 ms  18.024 ms  17.915 ms [Associate SRE Internship]
 7  global-tech-solutions-prod.net (172.24.1.20)  21.432 ms  21.905 ms  21.502 ms [Cloud Infrastructure Role]
 8  career.dev (198.51.100.12)  22.110 ms  22.351 ms  22.102 ms [Destination Reached - Ready to Hire!]`
      };
    }

    case 'top':
    case 'htop': {
      return {
        output: 'Launching virtual host monitor...',
        action: { type: 'open', value: 'monitoring' }
      };
    }

    case 'aws': {
      if (args[0] === 'sts' && args[1] === 'get-caller-identity') {
        return {
          output: `{\n  "UserId": "AIDASWAPNILDEVOPSEXAMPLE",\n  "Account": "123456789012",\n  "Arn": "arn:aws:iam::123456789012:user/visitor-recruiter"\n}`
        };
      }
      return { output: 'Usage: aws sts get-caller-identity' };
    }

    case 'terraform': {
      if (args[0] === 'plan') {
        return {
          output: `Terraform used the selected providers to generate the following execution plan:

Terraform will perform the following actions:

  \u001b[1;32m# aws_iam_role.recruiter_access will be created\u001b[0m
  \u001b[1;32m+\u001b[0m resource "aws_iam_role" "recruiter_access" {
      \u001b[1;32m+\u001b[0m arn                   = (known after apply)
      \u001b[1;32m+\u001b[0m assume_role_policy    = jsonencode({
            Statement = [
                {
                    Action    = "sts:AssumeRole"
                    Effect    = "Allow"
                    Principal = { Service = "recruiter.amazonaws.com" }
                },
            ]
            Version   = "2012-10-17"
        })
      \u001b[1;32m+\u001b[0m id                    = (known after apply)
      \u001b[1;32m+\u001b[0m name                  = "RecruiterAdminAccess"
    }

  \u001b[1;32m# portfolio_job_offer.swapnil will be created\u001b[0m
  \u001b[1;32m+\u001b[0m resource "portfolio_job_offer" "swapnil" {
      \u001b[1;32m+\u001b[0m action                = "Hire"
      \u001b[1;32m+\u001b[0m remote_allowed        = true
      \u001b[1;32m+\u001b[0m salary                = "Highly Competitive"
      \u001b[1;32m+\u001b[0m position              = "DevOps / SRE / Multi-Cloud Specialist"
    }

\u001b[1;32mPlan:\u001b[0m 2 to add, 0 to change, 0 to destroy.`
        };
      }
      return { output: 'Usage: terraform plan' };
    }

    case 'fortune': {
      const idx = Math.floor(Math.random() * FORTUNES.length);
      return { output: FORTUNES[idx] };
    }

    case 'matrix': {
      if (args[0] === 'off') {
        return { output: 'Stopping matrix...', action: { type: 'matrix', value: 'off' } };
      }
      return { output: 'Initializing digital rain stream...', action: { type: 'matrix', value: 'on' } };
    }

    case 'theme': {
      if (args.length === 0) {
        return { output: 'Usage: theme <ubuntu|kali|dracula|nord|gruvbox|catppuccin|hacker|light>' };
      }
      const selected = args[0].toLowerCase();
      const validThemes: ThemeType[] = ['ubuntu', 'kali', 'dracula', 'nord', 'gruvbox', 'catppuccin', 'hacker', 'light'];
      if (validThemes.includes(selected as ThemeType)) {
        setTheme(selected as ThemeType);
        return { output: `Theme changed to: ${selected}`, action: { type: 'theme', value: selected } };
      }
      return { output: `theme: '${selected}' is not a valid theme. Choose from: ${validThemes.join(', ')}` };
    }

    case 'sudo': {
      const subCmd = args.join(' ').trim();
      if (subCmd.startsWith('rm -rf /')) {
        return {
          output: 'Initiating system purge command as superuser...',
          action: { type: 'sudo_rm' }
        };
      }
      return { output: `Permission denied: visitor is not in the sudoers file. This incident will be reported.` };
    }

    case 'reboot':
      return { output: 'Rebooting system...', action: { type: 'reboot' } };

    case 'shutdown':
      return { output: 'Shutting down terminal display...', action: { type: 'shutdown' } };

    default:
      // Try to suggest a command if it is close
      return {
        output: `command not found: ${cmd} — type 'help' to see available commands`
      };
  }
};

// Help autocomplete matching
export const getAutocompleteSuggestion = (input: string, currentDir: string): string => {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || '';
  
  const allCommands = [
    'help', 'clear', 'history', 'pwd', 'ls', 'cd', 'tree', 'date', 'time', 'uptime', 'hostname', 'whoami',
    'about', 'skills', 'education', 'experience', 'certifications', 'projects', 'cat', 'resume', 'contact', 'social',
    'neofetch', 'systemctl', 'kubectl', 'ping', 'traceroute', 'top', 'htop', 'aws', 'terraform',
    'fortune', 'matrix', 'theme', 'sudo', 'reboot', 'shutdown'
  ];

  if (parts.length === 1) {
    const matched = allCommands.find(c => c.startsWith(cmd));
    if (matched && matched !== cmd) {
      return matched.substring(cmd.length);
    }
  }

  // Handle cd and cat file/dir autocompletion
  if ((cmd === 'cd' || cmd === 'cat' || cmd === 'ls') && parts.length > 1) {
    const fileArg = parts.slice(1).join(' ');
    const absPath = resolvePath(currentDir, '.');
    const node = getNodeByPath(absPath);
    if (node && node.type === 'dir') {
      const keys = Object.keys(node.children);
      const matched = keys.find(k => k.toLowerCase().startsWith(fileArg.toLowerCase()));
      if (matched && matched !== fileArg) {
        return matched.substring(fileArg.length);
      }
    }
  }

  return '';
};
export { getSshHeader };

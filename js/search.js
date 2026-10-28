/* ============================================
   ENDOR ACADEMY - Client-Side Search
   Fuzzy search across all modules, pages, and
   resources with a dropdown results panel.
   ============================================ */

const EndorSearch = {
    /* Static index of all searchable content */
    catalog: [
        /* --- Top-level pages --- */
        { title: 'Home', href: 'index.html', category: 'Page', tags: 'dashboard home welcome' },
        { title: 'Learning Paths', href: 'learning-paths.html', category: 'Page', tags: 'tracks courses paths' },
        { title: 'Certifications', href: 'certifications.html', category: 'Page', tags: 'certs badges exams' },
        { title: 'Labs', href: 'labs.html', category: 'Page', tags: 'hands-on practice sandbox' },
        { title: 'Resources', href: 'resources.html', category: 'Page', tags: 'battlecards guides playbooks' },
        { title: 'Leaderboard', href: 'leaderboard.html', category: 'Page', tags: 'ranking xp points' },
        { title: 'AI Coach', href: 'ai-coach.html', category: 'Page', tags: 'chat assistant mentor' },
        { title: 'Profile', href: 'profile.html', category: 'Page', tags: 'account settings badges' },
        { title: 'The Endor Labs Platform 2026', href: 'endor-platform-2026.html', category: 'Resource', tags: 'platform overview strategy auri agentic' },

        /* --- Foundation Track --- */
        { title: 'Application Security Fundamentals', href: 'modules/foundation/01-appsec-fundamentals.html', category: 'Foundation', tags: 'appsec basics owasp vulnerabilities' },
        { title: 'Software Supply Chain Security', href: 'modules/foundation/02-supply-chain-security.html', category: 'Foundation', tags: 'supply chain sbom dependencies attacks' },
        { title: 'Endor Labs Platform Overview', href: 'modules/foundation/03-endor-platform-overview.html', category: 'Foundation', tags: 'platform auri reachability sca sast overview' },
        { title: 'Security Vulnerability Types', href: 'modules/foundation/04-vulnerability-types.html', category: 'Foundation', tags: 'cve cwe vulnerabilities injection xss' },
        { title: 'Compliance & Regulatory Overview', href: 'modules/foundation/05-compliance-overview.html', category: 'Foundation', tags: 'compliance gdpr hipaa pci sox fedramp' },

        /* --- SCA & Reachability Track --- */
        { title: 'SCA Overview', href: 'modules/sca/01-sca-overview.html', category: 'SCA', tags: 'software composition analysis open source dependencies' },
        { title: 'Reachability Analysis', href: 'modules/sca/02-reachability-analysis.html', category: 'SCA', tags: 'reachability call graph function level noise reduction' },
        { title: 'License Compliance', href: 'modules/sca/03-license-compliance.html', category: 'SCA', tags: 'license gpl mit apache compliance copyleft' },
        { title: 'Prioritization & Endor Scores', href: 'modules/sca/04-prioritization.html', category: 'SCA', tags: 'prioritization risk scoring endor scores activity popularity' },
        { title: 'Remediation & Endor Patches', href: 'modules/sca/05-remediation.html', category: 'SCA', tags: 'remediation patches backported fixes upgrade impact' },
        { title: 'SBOM, VEX & Reporting', href: 'modules/sca/06-sbom-reporting.html', category: 'SCA', tags: 'sbom vex reporting spdx cyclonedx' },
        { title: 'Policy Enforcement & Governance', href: 'modules/sca/07-policy-enforcement.html', category: 'SCA', tags: 'policy enforcement governance thresholds exception' },
        { title: 'Enterprise SCA at Scale', href: 'modules/sca/08-enterprise-scaling.html', category: 'SCA', tags: 'enterprise scaling monorepo bazel multi-org parallel scanning' },

        /* --- Developer Track --- */
        { title: 'Developer Quickstart', href: 'modules/developer/01-developer-quickstart.html', category: 'Developer', tags: 'quickstart setup getting started endorctl' },
        { title: 'IDE, MCP & Coding Agents', href: 'modules/developer/02-ide-integration.html', category: 'Developer', tags: 'ide mcp cursor claude code vscode copilot agent' },
        { title: 'endorctl CLI & Automation', href: 'modules/developer/03-cli-automation.html', category: 'Developer', tags: 'cli endorctl command line automation scripts' },
        { title: 'Dependency Updates & Automated PRs', href: 'modules/developer/04-dependency-updates.html', category: 'Developer', tags: 'dependency updates automated pull requests upgrade' },
        { title: 'Custom Security Policies', href: 'modules/developer/05-custom-policies.html', category: 'Developer', tags: 'policies rules enforcement developer thresholds' },
        { title: 'API & Webhooks', href: 'modules/developer/06-api-integration.html', category: 'Developer', tags: 'api integration automation rest graphql webhooks' },
        { title: 'Secure AI Coding & Agent Governance', href: 'modules/developer/07-secure-ai-coding.html', category: 'Developer', tags: 'ai coding agents governance package firewall mcp auri' },

        /* --- Sales Track --- */
        { title: 'Selling Endor Labs', href: 'modules/sales/01-selling-endor-labs.html', category: 'Sales', tags: 'pitch value proposition selling reachability' },
        { title: 'Competitive Positioning', href: 'modules/sales/02-competitive-positioning.html', category: 'Sales', tags: 'competitive snyk mend veracode checkmarx' },
        { title: 'Objection Handling', href: 'modules/sales/03-objection-handling.html', category: 'Sales', tags: 'objections responses pricing noise' },
        { title: 'Demo & POV', href: 'modules/sales/04-demo-pov.html', category: 'Sales', tags: 'demo proof of value presentation trial' },
        { title: 'Deal Registration', href: 'modules/sales/05-deal-registration.html', category: 'Sales', tags: 'deal registration pipeline allbound' },
        { title: 'Pricing & Licensing', href: 'modules/sales/06-pricing-licensing.html', category: 'Sales', tags: 'pricing licensing subscription tiers packaging scan credits' },
        { title: 'Partner Program & Tiers', href: 'modules/sales/07-partner-program.html', category: 'Sales', tags: 'partner program tiers certification requirements' },
        { title: 'Vertical Selling Strategies', href: 'modules/sales/08-vertical-selling.html', category: 'Sales', tags: 'vertical finance healthcare government retail selling' },
        { title: 'Customer Success Stories', href: 'modules/sales/09-customer-success-stories.html', category: 'Sales', tags: 'customer success stories case study testimonials roi zebra egnyte' },

        /* --- Technical SE Track --- */
        { title: 'Technical Deep Dive', href: 'modules/technical/01-technical-deep-dive.html', category: 'Technical', tags: 'technical architecture deployment outpost integration' },
        { title: 'Demo Mastery', href: 'modules/technical/02-demo-mastery.html', category: 'Technical', tags: 'demo presentation lab setup sales engineer' },
        { title: 'POC Management', href: 'modules/technical/03-poc-management.html', category: 'Technical', tags: 'poc proof of concept trial evaluation success criteria' },
        { title: 'Advanced Integrations', href: 'modules/technical/04-advanced-integrations.html', category: 'Technical', tags: 'integrations jira slack webhooks ci cd automation' },
        { title: 'Troubleshooting', href: 'modules/technical/05-troubleshooting.html', category: 'Technical', tags: 'troubleshooting debugging exit codes support proxy' },
        { title: 'Security Architecture Review', href: 'modules/technical/06-security-architecture-review.html', category: 'Technical', tags: 'architecture review security design threat modeling' },
        { title: 'Customer Workshop Facilitation', href: 'modules/technical/07-customer-workshops.html', category: 'Technical', tags: 'workshops enablement training facilitation customer' },
        { title: 'Migration & Consolidation Strategies', href: 'modules/technical/08-migration-strategies.html', category: 'Technical', tags: 'migration strategy consolidation legacy platform switch' },

        /* --- Labs --- */
        { title: 'Lab: Your First Endor Labs Scan', href: 'labs/endorctl-first-scan.html', category: 'Lab', tags: 'endorctl first scan setup activate token' },
        { title: 'Lab: Reachability Triage', href: 'labs/reachability-triage.html', category: 'Lab', tags: 'reachability triage call graph findings noise' },
        { title: 'Lab: Package Firewall Configuration', href: 'labs/package-firewall-setup.html', category: 'Lab', tags: 'package firewall malicious packages block install' },
        { title: 'Lab: Secrets Detection Setup', href: 'labs/secrets-detection-setup.html', category: 'Lab', tags: 'secrets detection rules custom patterns scanning' },
        { title: 'Lab: Container Image Scanning', href: 'labs/container-scanning.html', category: 'Lab', tags: 'container scanning image registry reachability' },
        { title: 'Lab: GitHub Actions Integration', href: 'labs/github-actions-integration.html', category: 'Lab', tags: 'github actions ci cd keyless pipeline' },
        { title: 'Lab: SBOM & VEX Export', href: 'labs/sbom-vex-export.html', category: 'Lab', tags: 'sbom vex cyclonedx spdx export compliance' },
        { title: 'Lab: MCP Server & Agent Kit Setup', href: 'labs/mcp-agent-kit-setup.html', category: 'Lab', tags: 'mcp server agent kit cursor claude code ai coding' },

        /* --- Battlecards --- */
        { title: 'Battlecard: Endor Labs vs Snyk', href: 'battlecard-snyk.html', category: 'Battlecard', tags: 'snyk competitive comparison' },
        { title: 'Battlecard: Endor Labs vs Mend.io', href: 'battlecard-mend.html', category: 'Battlecard', tags: 'mend renovate competitive comparison' },
        { title: 'Battlecard: Endor Labs vs Veracode', href: 'battlecard-veracode.html', category: 'Battlecard', tags: 'veracode competitive comparison' },
        { title: 'Battlecard: Endor Labs vs Checkmarx', href: 'battlecard-checkmarx.html', category: 'Battlecard', tags: 'checkmarx competitive comparison' },
        { title: 'Battlecard: Endor Labs vs Black Duck', href: 'battlecard-black-duck.html', category: 'Battlecard', tags: 'black duck synopsys competitive' },
        { title: 'Battlecard: Endor Labs vs GitHub Advanced Security', href: 'battlecard-github-advanced-security.html', category: 'Battlecard', tags: 'github advanced security ghas codeql competitive' },
        { title: 'Battlecard: Endor Labs vs Sonatype', href: 'battlecard-sonatype.html', category: 'Battlecard', tags: 'sonatype nexus competitive' }
    ],

    /* Simple fuzzy matching: split query into words, check if every word
       appears somewhere in the item's title, category, or tags. */
    search(query) {
        if (!query || !query.trim()) return [];
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        const scored = [];

        for (const item of this.catalog) {
            const haystack = (item.title + ' ' + item.category + ' ' + item.tags).toLowerCase();
            let matchCount = 0;
            for (const w of words) {
                if (haystack.includes(w)) matchCount++;
            }
            if (matchCount === words.length) {
                const titleLower = item.title.toLowerCase();
                const boost = words.some(w => titleLower.includes(w)) ? 10 : 0;
                scored.push({ ...item, score: matchCount + boost });
            }
        }

        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, 10);
    },

    /* Build and inject the search results dropdown. Called from app.js. */
    init() {
        const searchContainer = document.querySelector('.nav-search');
        const searchInput = document.querySelector('#nav-search-input');
        if (!searchContainer || !searchInput) return;

        /* Link depth for this page; layout.js (loaded first) computes it. */
        const prefix = (window.EndorPaths && window.EndorPaths.prefix) || '';

        /* Create results dropdown */
        const dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown';
        dropdown.setAttribute('role', 'listbox');
        dropdown.setAttribute('aria-label', 'Search results');
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(dropdown);

        let debounce;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                const query = searchInput.value.trim();
                if (query.length < 2) {
                    dropdown.innerHTML = '';
                    dropdown.classList.remove('open');
                    return;
                }
                const results = this.search(query);
                this.renderResults(dropdown, results, prefix, query);
            }, 200);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.innerHTML = '';
                dropdown.classList.remove('open');
                searchInput.blur();
            }
            if (e.key === 'Enter') {
                const first = dropdown.querySelector('.search-result-item');
                if (first) {
                    first.click();
                    e.preventDefault();
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-search')) {
                dropdown.innerHTML = '';
                dropdown.classList.remove('open');
            }
        });
    },

    renderResults(dropdown, results, prefix, query) {
        if (results.length === 0) {
            dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
            dropdown.classList.add('open');
            return;
        }

        const highlight = (text) => {
            const words = query.toLowerCase().split(/\s+/).filter(Boolean);
            let highlighted = text;
            for (const w of words) {
                const regex = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
                highlighted = highlighted.replace(regex, '<mark>$1</mark>');
            }
            return highlighted;
        };

        dropdown.innerHTML = results.map(item => `
            <a href="${prefix}${item.href}" class="search-result-item" role="option">
                <span class="search-result-category">${item.category}</span>
                <span class="search-result-title">${highlight(item.title)}</span>
            </a>
        `).join('');
        dropdown.classList.add('open');
    }
};

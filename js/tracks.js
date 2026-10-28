/* ============================================
   TRACKS DATA - Single source of truth for all
   module sidebar navigation across all pages.
   Edit here to add/rename/reorder modules.
   ============================================ */

var EndorTracks = {
    foundation: {
        title: 'Foundation Track',
        modules: [
            { file: '01-appsec-fundamentals.html', title: 'Application Security Fundamentals', duration: '30 min' },
            { file: '02-supply-chain-security.html', title: 'Software Supply Chain Security', duration: '25 min' },
            { file: '03-endor-platform-overview.html', title: 'Endor Labs Platform Overview', duration: '35 min' },
            { file: '04-vulnerability-types.html', title: 'Security Vulnerability Types', duration: '35 min' },
            { file: '05-compliance-overview.html', title: 'Compliance & Regulatory Overview', duration: '30 min' }
        ]
    },
    sca: {
        title: 'SCA & Reachability Deep Dive',
        modules: [
            { file: '01-sca-overview.html', title: 'SCA Overview', duration: '30 min' },
            { file: '02-reachability-analysis.html', title: 'Reachability Analysis', duration: '40 min' },
            { file: '03-license-compliance.html', title: 'License Compliance', duration: '25 min' },
            { file: '04-prioritization.html', title: 'Prioritization & Endor Scores', duration: '30 min' },
            { file: '05-remediation.html', title: 'Remediation & Endor Patches', duration: '35 min' },
            { file: '06-sbom-reporting.html', title: 'SBOM, VEX & Reporting', duration: '25 min' },
            { file: '07-policy-enforcement.html', title: 'Policy Enforcement & Governance', duration: '35 min' },
            { file: '08-enterprise-scaling.html', title: 'Enterprise SCA at Scale', duration: '40 min' }
        ]
    },
    developer: {
        title: 'Developer Track',
        modules: [
            { file: '01-developer-quickstart.html', title: 'Developer Quickstart', duration: '30 min' },
            { file: '02-ide-integration.html', title: 'IDE, MCP & Coding Agents', duration: '35 min' },
            { file: '03-cli-automation.html', title: 'endorctl CLI & Automation', duration: '35 min' },
            { file: '04-dependency-updates.html', title: 'Dependency Updates & Automated PRs', duration: '40 min' },
            { file: '05-custom-policies.html', title: 'Custom Security Policies', duration: '30 min' },
            { file: '06-api-integration.html', title: 'API & Webhooks', duration: '40 min' },
            { file: '07-secure-ai-coding.html', title: 'Secure AI Coding & Agent Governance', duration: '35 min' }
        ]
    },
    sales: {
        title: 'Sales Enablement',
        modules: [
            { file: '01-selling-endor-labs.html', title: 'Selling Endor Labs', duration: '45 min' },
            { file: '02-competitive-positioning.html', title: 'Competitive Positioning & Battlecards', duration: '40 min' },
            { file: '03-objection-handling.html', title: 'Objection Handling & Negotiation', duration: '35 min' },
            { file: '04-demo-pov.html', title: 'Demo & Proof of Value', duration: '40 min' },
            { file: '05-deal-registration.html', title: 'Deal Registration & Pipeline', duration: '30 min' },
            { file: '06-pricing-licensing.html', title: 'Pricing & Licensing Models', duration: '35 min' },
            { file: '07-partner-program.html', title: 'Partner Program & Tier Benefits', duration: '30 min' },
            { file: '08-vertical-selling.html', title: 'Vertical-Specific Selling', duration: '35 min' },
            { file: '09-customer-success-stories.html', title: 'Customer Success Stories', duration: '30 min' }
        ]
    },
    technical: {
        title: 'Technical SE Track',
        modules: [
            { file: '01-technical-deep-dive.html', title: 'Architecture & Deployment Deep Dive', duration: '50 min' },
            { file: '02-demo-mastery.html', title: 'Demo Mastery & Lab Setup', duration: '45 min' },
            { file: '03-poc-management.html', title: 'POC & Trial Management', duration: '40 min' },
            { file: '04-advanced-integrations.html', title: 'Advanced Integrations', duration: '40 min' },
            { file: '05-troubleshooting.html', title: 'Troubleshooting & Support', duration: '35 min' },
            { file: '06-security-architecture-review.html', title: 'Security Architecture Review', duration: '40 min' },
            { file: '07-customer-workshops.html', title: 'Customer Workshop Facilitation', duration: '35 min' },
            { file: '08-migration-strategies.html', title: 'Migration & Consolidation Strategies', duration: '40 min' }
        ]
    }
};

/* ============================================
   AUTO-GENERATE MODULE SIDEBAR
   Replaces static sidebar HTML with dynamic
   generation from the tracks data above.
   ============================================ */
(function () {
    'use strict';

    var sidebar = document.querySelector('.module-sidebar');
    if (!sidebar) return;

    /* Detect current track from URL path */
    var pathParts = window.location.pathname.split('/');
    var modulesIdx = pathParts.indexOf('modules');
    if (modulesIdx === -1) return;

    var trackSlug = pathParts[modulesIdx + 1];
    var currentFile = pathParts[pathParts.length - 1];
    var track = EndorTracks[trackSlug];
    if (!track) return;

    /* Find current module index */
    var currentIndex = track.modules.findIndex(function (m) { return m.file === currentFile; });

    /* Build sidebar HTML */
    var navLinks = track.modules.map(function (mod, i) {
        var active = mod.file === currentFile ? ' active' : '';
        var title = mod.title.replace(/&/g, '&amp;');
        return '<a href="' + mod.file + '" class="module-link' + active + '">' +
            '<span class="module-status">' + (i + 1) + '</span>' +
            '<div><span class="module-title">' + title + '</span>' +
            '<span class="module-duration">' + mod.duration + '</span></div></a>';
    }).join('\n                ');

    var totalModules = track.modules.length;

    var sidebarHTML = '<div class="sidebar-header">' +
        '<a href="../../learning-paths.html" class="back-link">&#8592; Learning Paths</a>' +
        '<h3>' + track.title + '</h3>' +
        '<div class="sidebar-progress">' +
        '<div class="progress-bar"><div class="fill" data-progress="0%" style="width: 0%"></div></div>' +
        '<span class="sidebar-progress-text">0/' + totalModules + ' Complete</span>' +
        '</div></div>' +
        '<nav class="module-nav" aria-label="' + track.title + ' modules">' +
        navLinks + '</nav>';

    sidebar.innerHTML = sidebarHTML;
    sidebar.setAttribute('role', 'complementary');
    sidebar.setAttribute('aria-label', 'Module navigation');

    /* Update progress from store data */
    if (typeof EndorStore !== 'undefined') {
        var data = EndorStore.load();
        var completed = data.completedModules || [];
        var trackCompleted = track.modules.filter(function (m) {
            var moduleId = trackSlug + '/' + m.file.replace('.html', '');
            return completed.indexOf(moduleId) !== -1;
        }).length;
        var pct = Math.round((trackCompleted / totalModules) * 100);
        var fill = sidebar.querySelector('.fill');
        var progressText = sidebar.querySelector('.sidebar-progress-text');
        if (fill) {
            fill.style.width = pct + '%';
            fill.setAttribute('data-progress', pct + '%');
        }
        if (progressText) {
            progressText.textContent = trackCompleted + '/' + totalModules + ' Complete';
        }

        /* Mark completed modules in nav */
        var navLinksEls = sidebar.querySelectorAll('.module-link');
        navLinksEls.forEach(function (link, i) {
            var moduleId = trackSlug + '/' + track.modules[i].file.replace('.html', '');
            if (completed.indexOf(moduleId) !== -1) {
                link.querySelector('.module-status').innerHTML = '&#10003;';
                link.querySelector('.module-status').classList.add('completed');
            }
        });
    }
})();

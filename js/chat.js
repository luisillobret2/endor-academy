/* ============================================
   ENDOR ACADEMY - AI Coach Chat
   Keyword-matched chat responses (extracted from app.js)
   ============================================ */

function initChat() {
    const chatInput = document.querySelector('.ai-chat-input input');
    const chatSend = document.querySelector('.ai-chat-input .btn');
    const chatMessages = document.querySelector('.ai-chat-messages');

    if (!chatInput || !chatSend || !chatMessages) return;

    /* Accessibility: ARIA roles for chat */
    chatMessages.setAttribute('role', 'log');
    chatMessages.setAttribute('aria-label', 'Chat messages');
    chatMessages.setAttribute('aria-live', 'polite');
    chatInput.setAttribute('aria-label', 'Type a message to Endor Labs Mentor');
    chatSend.setAttribute('aria-label', 'Send message');

    /* Build context from user progress */
    let ctx = { modules: 0, xp: 0, level: 1, certs: 0, streak: 0, name: 'Jane' };
    if (typeof EndorStore !== 'undefined') {
        const d = EndorStore.load();
        ctx = { modules: d.completedModules.length, xp: d.xp, level: d.level, certs: d.certifications.length, streak: d.streak, name: d.userName.split(/\s+/)[0] };
    }

    const responses = [
        {
            keywords: ['sca', 'composition', 'dependency', 'open source', 'open-source'],
            response: "Great question! <strong>Endor Labs SCA</strong> (Software Composition Analysis) finds and prioritizes vulnerabilities in open-source dependencies. Key capabilities:\n\n<strong>1. Reachability Analysis</strong> \u2014 Only vulnerabilities your code actually calls reach your backlog\n<strong>2. Endor Scores</strong> \u2014 Activity, popularity, security, and code-quality signals for every package\n<strong>3. Endor Patches</strong> \u2014 Backported fixes when no upstream upgrade exists\n<strong>4. SBOM & VEX</strong> \u2014 CycloneDX and SPDX export with exploitability context\n\nThe <strong>SCA & Reachability Deep Dive</strong> path covers all 8 modules. <a href='learning-paths.html'>Start learning &rarr;</a>"
        },
        {
            keywords: ['reachability', 'call graph', 'noise'],
            response: "Reachability is Endor Labs' flagship capability. Here's the short version:\n\n\u2022 Endor Labs builds <strong>function-level call graphs</strong> across direct and transitive dependencies in <strong>40+ languages</strong>\n\u2022 Only vulnerabilities with a real call path into your code are flagged as reachable \u2014 the rest stay out of your backlog\n\u2022 Zebra Technologies cut SCA noise by <strong>97%</strong> with it\n\u2022 It works for SCA findings and container images (reachability from code to image)\n\nDive deeper in the <a href='modules/sca/02-reachability-analysis.html'>Reachability Analysis module</a> or practice in the <a href='labs/reachability-triage.html'>Reachability Triage lab &rarr;</a>"
        },
        {
            keywords: ['sast', 'static', 'code analysis', 'source code'],
            response: "Endor Labs SAST comes in two flavors:\n\n<strong>1. Rule-based SAST</strong> \u2014 Curated rules you can clone, customize, and manage with exception policies\n<strong>2. AI SAST</strong> \u2014 Security-engineer agents trace dataflow across every repo and PR to catch logic flaws rule-based scanners miss, cutting up to 95% of false positives\n\u2022 AI SAST PR scans comment directly on pull requests\n\u2022 AI context rules adapt findings to your application\n\nLearn how agents review code in the <a href='modules/developer/07-secure-ai-coding.html'>Secure AI Coding module &rarr;</a>"
        },
        {
            keywords: ['container', 'docker', 'kubernetes', 'k8s', 'image'],
            response: "Endor Labs Container Scanning takes a unique angle: <strong>reachability from code to image</strong>.\n\n<strong>1. Noise reduction</strong> \u2014 CVEs in packages your app never loads stay out of the queue\n<strong>2. Incremental scanning</strong> \u2014 Fast rescans as images change\n<strong>3. Registry scanning</strong> \u2014 Scan images straight from your registry\n<strong>4. Base image remediation</strong> \u2014 Concrete guidance to safer base images\n<strong>5. Zero cluster footprint</strong> \u2014 Nothing to install in your cluster\n\nPractice in the <a href='labs/container-scanning.html'>Container Image Scanning lab &rarr;</a>"
        },
        {
            keywords: ['secret', 'secrets', 'credential', 'api key', 'token', 'password'],
            response: "Endor Labs Secrets Detection catches leaked credentials <strong>before the commit</strong>:\n\n<strong>1. One policy</strong> \u2014 Same rules from laptop to pipeline, so coverage doesn't depend on team-level config\n<strong>2. Built-in rules</strong> \u2014 Detect API keys, tokens, passwords, certificates and more\n<strong>3. Custom rules</strong> \u2014 Add your own patterns for internal token formats\n<strong>4. PR and full-scan coverage</strong> \u2014 Scan current code and history\n\nTry it hands-on in the <a href='labs/secrets-detection-setup.html'>Secrets Detection Setup lab &rarr;</a>"
        },
        {
            keywords: ['supply chain', 'sbom', 'dependency risk', 'package', 'malware', 'firewall'],
            response: "Supply chain security is where Endor Labs shines:\n\n<strong>1. Package Firewall</strong> \u2014 Blocks known-malicious packages at install, before they reach dev machines or CI\n<strong>2. Malware detection</strong> \u2014 Typosquatting, dependency confusion, and compromised packages\n<strong>3. SBOM & VEX</strong> \u2014 CycloneDX/SPDX export and import with exploitability context\n<strong>4. Endor Scores</strong> \u2014 Risk scoring for every open-source package\n\nConfigure it yourself in the <a href='labs/package-firewall-setup.html'>Package Firewall lab &rarr;</a>"
        },
        {
            keywords: ['certification', 'cert', 'exam', 'certified', 'prepare'],
            response: `Based on your progress (${ctx.modules} modules, ${ctx.xp.toLocaleString()} XP), here's my recommendation:\n\n` +
                (ctx.certs === 0
                    ? "<strong>Target: Endor Labs Certified Associate</strong>\n\u2022 Complete the Foundation Track (5 modules)\n\u2022 60-min online exam, 50 questions, 70% to pass\n\u2022 Estimated prep time: 4\u20136 hours"
                    : "<strong>Target: Endor Labs Certified Professional</strong>\n\u2022 Complete the SCA & Reachability and Developer tracks\n\u2022 90-min proctored exam, 60 questions, 75% to pass\n\u2022 Estimated prep time: 10\u201312 hours") +
                "\n\n<a href='certifications.html'>View all certifications &rarr;</a>"
        },
        {
            keywords: ['compete', 'snyk', 'competitor'],
            response: "Key differentiators <strong>Endor Labs vs. Snyk</strong>:\n\n<strong>1. Reachability depth</strong> \u2014 Function-level call graphs across 40+ languages, including deep transitive analysis\n<strong>2. Agentic security</strong> \u2014 Coding Agent Governance, Agent Kit, and MCP tools Snyk doesn't offer\n<strong>3. Package Firewall</strong> \u2014 Block malicious packages at install time\n<strong>4. Endor Patches</strong> \u2014 Backported fixes when no upstream upgrade exists\n\nSee the full comparison in the <a href='battlecard-snyk.html'>Snyk Battlecard &rarr;</a>"
        },
        {
            keywords: ['veracode'],
            response: "Key differentiators <strong>Endor Labs vs. Veracode</strong>:\n\n<strong>1. Developer-first</strong> \u2014 IDE, CLI, and PR-native vs. Veracode's scan-and-wait model\n<strong>2. Reachability</strong> \u2014 Vulnerabilities your code actually calls, not everything that exists\n<strong>3. Agentic coverage</strong> \u2014 AI SAST plus governance for AI coding agents\n<strong>4. Deployment</strong> \u2014 SaaS-first with Endor Outpost options vs. heavier on-prem setup\n\nPractice positioning with the <a href='battlecard-veracode.html'>Veracode Battlecard &rarr;</a>"
        },
        {
            keywords: ['checkmarx'],
            response: "Key differentiators <strong>Endor Labs vs. Checkmarx</strong>:\n\n<strong>1. SCA leadership</strong> \u2014 Reachability-based analysis with Endor Scores\n<strong>2. AI-native analysis</strong> \u2014 AI SAST agents that cut up to 95% of false positives\n<strong>3. Remediation</strong> \u2014 Endor Patches and automated PRs vs. manual triage\n<strong>4. Developer experience</strong> \u2014 MCP server and CLI built into modern workflows\n\nSee the <a href='battlecard-checkmarx.html'>Checkmarx Battlecard &rarr;</a>"
        },
        {
            keywords: ['mend'],
            response: "On <strong>Endor Labs vs. Mend.io</strong>:\n\n<strong>1. Reachability-first</strong> \u2014 Endor Labs was built around function-level reachability; noise reduction is the product's core, not a feature\n<strong>2. Agentic security</strong> \u2014 Coding Agent Governance, Agent Kit, MCP server, and AI SAST for AI-era workflows\n<strong>3. Package Firewall</strong> \u2014 Real-time malicious package blocking at install\n<strong>4. Keep it classy</strong> \u2014 Acknowledge Mend's platform breadth and Renovate; pivot to reachability precision and AI-era coverage\n\nFull details in the <a href='battlecard-mend.html'>Mend.io Battlecard &rarr;</a>"
        },
        {
            keywords: ['demo', 'poc', 'presentation', 'show'],
            response: "For demo preparation, I recommend the <strong>Demo Mastery</strong> module. Here's a quick Endor Labs demo flow:\n\n<strong>1. Scan</strong> \u2014 Connect a repo, run endorctl scan, show the dependency inventory (3 min)\n<strong>2. Reachability</strong> \u2014 Show only-reachable findings and the call path evidence (5 min)\n<strong>3. Remediate</strong> \u2014 Open a finding, show upgrade impact analysis and an Endor Patch (3 min)\n<strong>4. Package Firewall</strong> \u2014 Attempt a malicious package install and watch it get blocked (3 min)\n<strong>5. AI</strong> \u2014 Show an AI SAST PR review and the agent governance inventory (3 min)\n\nTotal: ~17 min. <a href='modules/technical/02-demo-mastery.html'>View Demo Mastery module &rarr;</a>"
        },
        {
            keywords: ['objection', 'sales', 'pitch', 'sell', 'deal', 'pricing', 'price'],
            response: "Common objections and how to handle them:\n\n<strong>\"We already have an SCA tool\"</strong>\n\u2192 \"Most tools tell you what's vulnerable. Endor Labs tells you what's exploitable \u2014 Zebra cut SCA noise by 97% and focused on real risk.\"\n\n<strong>\"It's too expensive\"</strong>\n\u2192 \"Compare the cost of triaging thousands of false positives every month. Reachability means your engineers spend time on findings that matter.\"\n\n<strong>\"Our developers won't adopt another tool\"</strong>\n\u2192 \"Endor Labs plugs into the IDEs and agents developers already use \u2014 Cursor, Claude Code, VS Code \u2014 via MCP. No workflow change.\"\n\nPractice more in the <a href='modules/sales/03-objection-handling.html'>Objection Handling module &rarr;</a>"
        },
        {
            keywords: ['cicd', 'ci/cd', 'pipeline', 'jenkins', 'github actions', 'gitlab'],
            response: "Endor Labs integrates with all major CI/CD platforms:\n\n<strong>1. GitHub Actions</strong> \u2014 Native scanning with keyless OIDC authentication\n<strong>2. GitLab Pipelines</strong> \u2014 MR scans with comments\n<strong>3. Jenkins</strong> \u2014 Pipeline integration and supervisory scans\n<strong>4. Azure DevOps, Bitbucket, CircleCI, Buildkite, Google Cloud Build</strong> \u2014 All supported\n\u2022 Keyless auth available for GitHub, AWS, Azure, and Google Cloud\n\nSet it up in the <a href='labs/github-actions-integration.html'>GitHub Actions lab &rarr;</a>"
        },
        {
            keywords: ['renovate', 'upgrade', 'update', 'dependency management', 'patch'],
            response: "Endor Labs keeps dependencies healthy in three ways:\n\n<strong>1. Automated Pull Requests</strong> \u2014 Open fix PRs for vulnerable dependencies\n<strong>2. Upgrade impact analysis</strong> \u2014 See what an upgrade touches before you take it\n<strong>3. Endor Patches</strong> \u2014 Backported fixes for Java and Python when no upgrade exists\n\nLearn more in the <a href='modules/developer/04-dependency-updates.html'>Dependency Updates module &rarr;</a>"
        },
        {
            keywords: ['ai', 'agent', 'mcp', 'cursor', 'claude', 'copilot', 'coding agent'],
            response: "Endor Labs is the leader in <strong>securing AI coding agents</strong>:\n\n<strong>1. Coding Agent Governance</strong> \u2014 Inventory every agent, model, MCP server, and skill; enforce allow/block/ask-human policies on risky actions\n<strong>2. Agent Kit & MCP server</strong> \u2014 Give agents security tools: fix vulnerabilities, detect secrets, block malicious packages\n<strong>3. Package Firewall for agents</strong> \u2014 Malicious packages blocked at install\n<strong>4. AI Security Review</strong> \u2014 Agents review every PR for architectural risk\n\nGet hands-on in the <a href='labs/mcp-agent-kit-setup.html'>MCP Server & Agent Kit lab &rarr;</a>"
        },
        {
            keywords: ['api', 'automat', 'script', 'integrate'],
            response: "The Endor Labs API enables full automation:\n\n<strong>REST API</strong> \u2014 Manage projects, findings, policies, and scan results\n<strong>Webhooks</strong> \u2014 Real-time notifications on new findings\n<strong>endorctl CLI</strong> \u2014 Script scans in any pipeline\n<strong>Data exporters</strong> \u2014 Push findings to GitHub Advanced Security, S3, or Wiz\n\nThe <a href='modules/developer/06-api-integration.html'>API & Webhooks module</a> covers this in depth."
        },
        {
            keywords: ['license', 'compliance', 'gpl', 'legal'],
            response: "Endor Labs License Compliance helps manage open-source legal risk:\n\n<strong>1. License detection</strong> \u2014 Identifies licenses for all dependencies\n<strong>2. Policy engine</strong> \u2014 Block copyleft (GPL) and restrict specific licenses via policies\n<strong>3. Reporting</strong> \u2014 License inventory for audits and SBOM export\n\nLearn more in the <a href='modules/sca/03-license-compliance.html'>License Compliance module &rarr;</a>"
        },
        {
            keywords: ['badge', 'achievement', 'reward', 'gamif'],
            response: `You currently have <strong>${EndorBadges ? EndorBadges.getEarnedBadges().length : 0} badges</strong> earned! Badges are awarded for:\n\n\u2022 <strong>First Steps</strong> \u2014 Complete your first module\n\u2022 <strong>Track Champion</strong> \u2014 Complete any full track\n\u2022 <strong>Quiz Master</strong> \u2014 Score 100% on any quiz\n\u2022 <strong>Streak Hero</strong> \u2014 Maintain a 7-day streak\n\u2022 <strong>XP Milestone</strong> \u2014 Reach 1,000 / 5,000 / 10,000 XP\n\nVisit your <a href='profile.html'>Profile</a> to see all your achievements!`
        },
        {
            keywords: ['progress', 'status', 'how am i', 'my stats', 'dashboard'],
            response: `Here's your current progress, ${ctx.name}:\n\n<strong>Level:</strong> ${ctx.level} (${typeof EndorStore !== 'undefined' ? EndorStore.levelTitle(ctx.level) : ''})\n<strong>XP:</strong> ${ctx.xp.toLocaleString()}\n<strong>Modules Completed:</strong> ${ctx.modules} / 37\n<strong>Certifications:</strong> ${ctx.certs}\n<strong>Current Streak:</strong> ${ctx.streak} days\n\n` +
                (ctx.modules === 0
                    ? "You haven't started any modules yet. I'd recommend beginning with the <a href='modules/foundation/01-appsec-fundamentals.html'>Foundation Track</a>!"
                    : ctx.modules < 20
                    ? "Great progress! Keep building momentum by completing more tracks."
                    : "Impressive work! You're well on your way to expert level.")
        },
        {
            keywords: ['hello', 'hi', 'hey', 'help', 'what can you'],
            response: `Hello ${ctx.name}! I'm <strong>Endor Labs Mentor</strong>, your AI learning coach. I can help you with:\n\n\u2022 <strong>Product Knowledge</strong> \u2014 SCA & Reachability, AI SAST, Secrets, Containers, Package Firewall\n\u2022 <strong>Certification Prep</strong> \u2014 Study plans and exam readiness\n\u2022 <strong>Competitive Positioning</strong> \u2014 Snyk, Mend, Veracode, Checkmarx battlecards\n\u2022 <strong>Sales & Demo</strong> \u2014 Objection handling, demo scripts, pitch practice\n\u2022 <strong>Technical Topics</strong> \u2014 endorctl, CI/CD, MCP, API, integrations\n\u2022 <strong>Your Progress</strong> \u2014 Stats, badges, and recommendations\n\nTry asking: \"How do I prepare for certification?\" or \"Compare Endor Labs vs Snyk\"`
        },
        {
            keywords: ['recommend', 'suggest', 'what should', 'next', 'where do i start'],
            response: (ctx.modules === 0
                ? `Welcome ${ctx.name}! I'd recommend starting with the <strong>Foundation Track</strong>:\n\n1. AppSec Fundamentals (30 min)\n2. Supply Chain Security (25 min)\n3. Endor Labs Platform Overview (35 min)\n4. Vulnerability Types (35 min)\n5. Compliance Overview (30 min)\n\nThis gives you the base knowledge for all other tracks. <a href='modules/foundation/01-appsec-fundamentals.html'>Start now &rarr;</a>`
                : ctx.modules < 10
                ? `Nice start, ${ctx.name}! Based on your progress, I'd suggest:\n\n1. <strong>SCA & Reachability Deep Dive</strong> \u2014 The core Endor Labs differentiator\n2. <strong>Sales Enablement</strong> \u2014 Great for customer-facing roles\n3. <strong>Developer Track</strong> \u2014 If you're more technical\n\n<a href='learning-paths.html'>Browse all tracks &rarr;</a>`
                : `You're doing great, ${ctx.name}! With ${ctx.modules} modules done, consider:\n\n1. <strong>Technical SE Track</strong> \u2014 Deep technical positioning\n2. <strong>Labs</strong> \u2014 Hands-on practice with endorctl and the MCP server\n3. <strong>Certification exam</strong> \u2014 You might be ready!\n\n<a href='certifications.html'>Check your certification readiness &rarr;</a>`)
        },
        {
            keywords: ['partner', 'allbound', 'portal', 'tier', 'silver', 'gold', 'platinum'],
            response: "Endor Labs' partner program has three tiers:\n\n<strong>Silver</strong> \u2014 Foundation access, basic deal registration\n<strong>Gold</strong> \u2014 Advanced training, co-marketing, priority support\n<strong>Platinum</strong> \u2014 Executive sponsorship, joint solutions, dedicated SE\n\nYour learning progress directly impacts your partner status. Certified partners get <strong>higher deal registration margins</strong> and <strong>priority lead distribution</strong>."
        }
    ];

    const defaultResponse = "That's a great question! While I search for the best resources, here are some starting points:\n\n\u2022 <a href='learning-paths.html'>Learning Paths</a> \u2014 Structured courses by topic\n\u2022 <a href='resources.html'>Resources</a> \u2014 Battlecards, guides, and references\n\u2022 <a href='certifications.html'>Certifications</a> \u2014 Validate your knowledge\n\nCould you tell me more about what specific area you'd like to explore?";

    function sendMessage(text) {
        if (!text.trim()) return;

        /* Award AI Student badge on first chat message */
        if (typeof EndorBadges !== 'undefined') EndorBadges.earn('ai-student');

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `
            <div class="chat-bubble">${escapeHtml(text)}</div>
        `;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        /* Show typing indicator */
        const typing = document.createElement('div');
        typing.className = 'chat-message ai';
        typing.innerHTML = '<div class="chat-bubble chat-typing"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typing.remove();
            const lower = text.toLowerCase();
            const match = responses.find(r =>
                r.keywords.some(k => lower.includes(k))
            );

            const aiMsg = document.createElement('div');
            aiMsg.className = 'chat-message ai';
            const reply = match ? (typeof match.response === 'function' ? match.response() : match.response) : defaultResponse;
            aiMsg.innerHTML = `<div class="chat-bubble">${reply}</div>`;
            chatMessages.appendChild(aiMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000 + Math.random() * 500);
    }

    chatSend.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
    });

    document.querySelectorAll('.chat-suggestion').forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.addEventListener('click', () => {
            sendMessage(btn.textContent);
        });
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                sendMessage(btn.textContent);
            }
        });
    });
}

/* --- Search (delegates to EndorSearch in search.js) --- */

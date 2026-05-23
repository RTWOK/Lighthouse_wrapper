export function createDummyModal() {
    return {
        overline: 'Audit status',
        title: '3 audits could not run',
        footer: 'Generated from the latest Lighthouse pass',
        children: [
            {
                type: 'warning',
                title: 'Largest Contentful Paint',
                message: 'Reason: page navigation was interrupted by an interstitial response.',
                tags: ['Performance', 'Mobile', 'Needs retry']
            },
            {
                type: 'error',
                title: 'Screenshot thumbnails',
                message: 'Reason: the document did not finish painting before the trace ended.',
                tags: ['Diagnostics', 'Trace missing']
            },
            {
                type: 'info',
                title: 'Third-party summary',
                message: 'Reason: no eligible network requests were captured for this category.',
                tags: ['Best Practices', 'Informational']
            }
        ]
    };
}

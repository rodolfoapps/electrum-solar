/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://electrum.solar',
  generateRobotsTxt: true,
  trailingSlash: true,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (sitemapConfig, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.match(/^\/(solar-panel-cost|solar-companies|solar-incentives|electricity-rates|energy-storage)\/?$/)) {
      priority = 0.95;
      changefreq = 'weekly';
    } else if (path.match(/^\/(solar-panel-cost|solar-companies|solar-incentives|electricity-rates|energy-storage)\/[^/]+\/?$/)) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.match(/^\/(about|get-quote)\/?$/)) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: sitemapConfig.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default config;

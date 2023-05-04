module.exports = {
   plugins: [
      'gatsby-plugin-postcss',
      /*
         PROGRESSIVE WEB APPLICATION
      */
      //STEP-1 ( gatsby-plugin-manifest )
      {
         resolve: `gatsby-plugin-manifest`,
         options: {
            name: "MassageOpen",
            short_name: "MassageOpen",
            start_url: "/",
            background_color: "#FFFFFF",
            theme_color: "#FFFFFF",
            display: "standalone",
            icon: "src/images/icon.png",
            crossOrigin: "use-credentials"
         }
      },
      //STEP-2 ( gatsby-plugin-offline )
      `gatsby-plugin-offline`
   ]
}
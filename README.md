# Delta Program website
Delta is the Fontys ICT excellence program where students get to explore technologies and learn while participating in real-world projects with external stakeholders. Therefore this website aims to show what Delta is about and what projects we built.

To make upkeep as easy as possible the website is built in WordPress for the built-in content management system combined with [ACF](https://www.advancedcustomfields.com/) for custom post types.

## Media file naming
WordPress provides file storage under the name of ‘Media’. To be able to efficiently add new post types the media files should follow these name patterns:

- hero image: ‘{project name}-hero’.
- logo: ‘{project name}-logo’.
- extra images: ‘{project name}-extra-{number}’.
- student photo: ‘{student name}-photo’.

## Guides
### Adding pages
To be able to add new pages in which you can code there are 2 steps. Firstly, in the WordPress admin interface under ‘Pages’ you have to create a new page with the title which will be the URL slug, for example if you create a new page named ‘About’ the corresponding page will be at ‘/about’ and the code file in the subtheme should be named ‘page-about.php’. 

If you want to persist these pages into the production environment it is advised to follow these steps locally, program your page, clone the master in the production environment and manually add the page to WordPress by following the first step of this guide.

### Setup
Set up the website by following these steps.

1. Download clean wordpress installation from [wordpress.org](https://wordpress.org/).
2. Install the setup using Xampp (Apache & MySQL).
3. Clone this repository and replace your existing wp-content folder with the contents of this repository.
4. Sign in to localhost/{project folder}/wp-admin.
5. Activate the child-theme under 'Appearence' -> 'Delta'.
6. Import the database for the remainder of the data.
7. Flush the permalinks by opening 'Settings' -> 'Permalinks' -> 'Save changes'.

## Contributors

<a href = "https://github.com/xl3ehindTim/delta-site/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=xl3ehindTim/delta-site"/>
</a>

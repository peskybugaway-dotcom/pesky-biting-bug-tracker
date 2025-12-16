const placeholders = {
  Mosquitoes: "/images/placeholder-mosquito.png",
  "No-See-Ums": "/images/placeholder-no-see-um.png",
  Flies: "/images/placeholder-fly.png",
  Ants: "/images/placeholder-ant.png",
  Ticks: "/images/placeholder-tick.png",
  "Florida Pests": "/images/placeholder-florida.png",
  Nuisance: "/images/placeholder-nuisance.png",
  Gnats: "/images/placeholder-gnat.png",
};

export default function getBugImage(bug) {
  if (bug.image && bug.image.startsWith("/images/")) {
    return bug.image;
  }
  return placeholders[bug.category] || "/images/placeholder-generic.png";
}

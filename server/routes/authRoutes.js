const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: [
        "user-read-email",
        "playlist-read-private",
        "playlist-modify-private",
        "playlist-modify-public"
      ]
    }),
    function(req, res) {}
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", { failureRedirect: "/login" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    res.send(req.user);
  });
};

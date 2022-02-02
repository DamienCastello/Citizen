module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f14ba50b3464042542d791d32b40492f'),
  },
});

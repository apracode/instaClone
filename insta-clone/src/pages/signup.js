import React from "react";
import { useSignUpPageStyles } from "../styles";
import SEO from "../components/shared/Seo";
import {
  Card,
  CardHeader,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { LoginWithFacebook } from "./login";
import { Link } from "react-router-dom";

function SignUpPage() {
  const classes = useSignUpPageStyles();

  return (
    <>
      <SEO title="Sign Up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook
              color="primary"
              iconColor="white"
              variant="contained"
            />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form action="">
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                margin="dense"
                type="email"
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                type="text"
                className={classes.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                type="password"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </Card>
          <Card>
            <Typography align="center" variant="body2">
              Have an account?
              <Link to="/accounts/login">
                <Button color="primary" className={classes.login}>
                  Login
                </Button>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export default SignUpPage;

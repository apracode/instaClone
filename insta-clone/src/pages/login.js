import React from "react";
import { useLoginPageStyles } from "../styles";
import {
  Card,
  CardHeader,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

import SEO from "../components/shared/Seo";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";

function LoginPage() {
  const classes = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form action="">
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
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <LoginWithFacebook color="primary" iconColor="blue" />
            <Button fullWidth color="secondary">
              <Typography variant="caption" color="primary">
                Forgot password?
              </Typography>
            </Button>
          </Card>
          <Card>
            <Typography align="center" variant="body2">
              Don't have an account?
              <Link to="/accounts/emailsignup">
                <Button color="primary" className={classes.signUp}>
                  SignUp
                </Button>
              </Link>
            </Typography>
          </Card>
        </article>
      </section>
    </>
  );
}

export function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();

  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;
  return (
    <Button fullWidth color={color} variant={variant}>
      <img
        src={facebookIcon}
        alt="Facebook Icon"
        className={classes.facebookIcon}
      />
      Log In With Facebook
    </Button>
  );
}

export default LoginPage;

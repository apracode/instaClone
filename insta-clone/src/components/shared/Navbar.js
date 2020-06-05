import React, { useState, useEffect } from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import {
  AppBar,
  Hidden,
  InputBase,
  Avatar,
  Grid,
  fade,
  Fade,
  Typography,
  Zoom
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  LoadingIcon,
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon
} from "../../icons";
import { defaultCurrentUser, getDefaultUser } from "../../data";
import NotificationTooltip from "../notification/NotificationTooltip";
import NotificationList from "../notification/NotificationList";
import { useNProgress } from "@tanem/react-nprogress";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const path = history.location.pathname;

  useEffect(() => {
    setIsLoadingPage(false);
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
  );
}

function Logo() {
  const classes = useNavbarStyles();

  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Logo" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

function Search({ history }) {
  const classes = useNavbarStyles();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const hasResults = Boolean(query) && results.length > 0;

  useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query]);

  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map(result => {
                return (
                  <Grid
                    key={result.id}
                    item
                    className={classes.resultLink}
                    onClick={() => {
                      history.push(`/${result.username}`);
                      setQuery("");
                    }}
                  >
                    <div className={classes.resultWrapper}>
                      <div className={classes.avatarWrapper}>
                        <Avatar
                          src={result.profile_image}
                          alt="Profile photo"
                        />
                      </div>
                      <div className={classes.nameWrapper}>
                        <Typography variant="body1">{result.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {result.username}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          )
        }
      >
        <InputBase
          onChange={e => setQuery(e.target.value)}
          value={query}
          placeholder="Search"
          className={classes.input}
          startAdornment={<span className={classes.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span
                onClick={() => setQuery("")}
                className={classes.clearIcon}
              />
            )
          }
        />
      </WhiteTooltip>
    </Hidden>
  );
}
function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setShowList] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(handleHideToolTip, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleToogleList() {
    setShowList(prev => !prev);
  }

  function handleHideToolTip() {
    setShowToolTip(false);
  }

  function handleHideList() {
    setShowList(false);
  }

  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList hide={handleHideList} />}
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showToolTip}
          onOpen={handleHideToolTip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToogleList}>
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div
            className={
              path === `/${defaultCurrentUser.username}`
                ? classes.profileActive
                : ""
            }
          >
            <Avatar
              src={defaultCurrentUser.profile_image}
              className={classes.profileImage}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`
        }}
      >
        <div className={classes.progressBackground} />
      </div>
      
    </div>
  );
}

export default Navbar;

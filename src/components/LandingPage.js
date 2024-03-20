import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';
import Footer from "./Footer";
import Button from '@mui/material/Button'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function LandingPage({ theme, lang }) {
  const renderButton = (icon, text, to, tooltip) => (
    <Link to={to} className="inline-flex flex-col items-center justify-center text-center">
      <Tooltip title={tooltip}>
        <IconButton color="inherit">
          {icon}
        </IconButton>
      </Tooltip>
      <span className="text-xs text-white">{text}</span>
    </Link>
  );

  return (
    <main className="xs:max-w-xl bg-white-500 rounded p-0 shadow ">
      <div
        className="bg-blue-400 text-white py-2 h-20 px-6 mb-1 sticky top-0 flex items-center justify-between"
        style={{ backgroundColor: "rgb(4, 125, 149)", position: "fixed", top: 0, left: 0, right: 0}}
      >
        <Link to="/" className="text-2xl font-bold tracking-wider text-white hover:text-gray-300">Divvy</Link>
        <div className="flex items-center space-x-4">
          {renderButton(<AppsIcon />, "App", "/App/Home", "Go to App")}
          {renderButton(<SchoolIcon />, "Tutorial", "/App/Tutorial", "Tutorial")}
          {renderButton(<ContactMailIcon />, "Contact", "/App/Contact", "Contact Me")}
        </div>
      </div>
      <div className="mt-20 p-4 max-w-3xl mx-auto">
        <Card style={{ maxWidth: 600, margin: '20px', padding: '20px' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Welcome to Divvy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Streamline your shared expenses with Divvy: track, split, and settle up in moments, keeping all your balances clear and straightforward.
            </Typography>
          </CardContent>
        </Card>
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/App/Home"
            style={{ marginBottom: '20px', backgroundColor: "rgb(4, 125, 149)" }}
          >
            Divvy it up
          </Button>
        </div>
      </div>
      <Footer theme={theme} lang={lang} />
    </main>
  );
}

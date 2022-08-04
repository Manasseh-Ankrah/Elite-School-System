import React from "react";
import Search from "@mui/icons-material/Search";
import { Paper, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "../../css/Level.css";

function Level() {
  return (
    <div className="level">
      <div className="level_typograph">
        <Typography variant="h6" noWrap component="div">
          Browse through Levels
        </Typography>
      </div>
      {/* <Paper className="view_paper" elevetion={3}> */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        className="class_box"
        noValidate
        autoComplete="off"
      >
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            All Levels
          </Button>
        </div>
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            Diploma Level
          </Button>
        </div>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        className="class_box"
        noValidate
        autoComplete="off"
      >
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            Advance Diploma Level
          </Button>
        </div>
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            NCC-Level 3
          </Button>
        </div>
      </Box>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        className="class_box"
        noValidate
        autoComplete="off"
      >
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            NCC-Level 4
          </Button>
        </div>
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            NCC-Level 5
          </Button>
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        className="class_box"
        noValidate
        autoComplete="off"
      >
        <div className="btn_search">
          <Button
            //   onClick={onSearch}
            variant="contained"
            className="btn"
            // color="success"
          >
            NCC-Level 6
          </Button>
        </div>
      </Box>
      {/* </Paper> */}
    </div>
  );
}

export default Level;

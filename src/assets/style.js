import brown from '@material-ui/core/colors/brown'
import grey from '@material-ui/core/colors/grey'
import lightBlue from '@material-ui/core/colors/lightBlue'
import iconMailSp from '../img/icon_mail_sp.svg'

export const commonStyles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: "95%",
      margin: "3vw auto"
    }
  },
  titleRow: {
    backgroundColor: grey[100],
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    color: grey[700],
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    padding: "10px",
    [theme.breakpoints.up('sm')]: {
      height: "50px",
    },
    [theme.breakpoints.down('sm')]: {
      height: "30px",
    }
  },
  titleItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down('sm')]: {
      fontSize: "1rem",
    }
  },
  titleFrom: {
    [theme.breakpoints.up('sm')]: {
      width: "20%"
    }
  },
  titleTo: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: "8px",
      paddingLeft: "8px",
      borderLeft: "1px solid #000",
      whiteSpace: "no-wrap"
    },
    [theme.breakpoints.up('sm')]: {
      width: "20%"
    }
  },
  titleSubject: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: "8px",
      paddingLeft: "8px",
      borderLeft: "1px solid #000"
    },
    [theme.breakpoints.up('sm')]: {
      width: "45%"
    }
  },
  titleDate: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: "8px",
      paddingLeft: "8px",
      borderLeft: "1px solid #000"
    },
    [theme.breakpoints.up('sm')]: {
      width: "15%",
      paddingLeft: "35px"
    }
  },
  titleItemIcon: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tableInnerRow: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50px",
    borderBottom: "1px solid #ddd",
    boxSizing: "border-box",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      height: "auto",
      width: "100%",
      position: "relative",
      padding: "10px"
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row",
    }
  },
  tableInnerItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box",
    [theme.breakpoints.up('sm')]: {
      padding: "10px",
    }
  },
  innerItemFrom: {
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      marginBottom: "3px",
    },
    [theme.breakpoints.up('sm')]: {
      width: "20%",
    },
  },
  innerItemTo: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: "5px"
    },
    [theme.breakpoints.up('sm')]: {
      width: "20%",
    },
  },
  innerItemSubject: {
    [theme.breakpoints.up('sm')]: {
      width: "45%",
    },
  },
  innerItemClip: {
    [theme.breakpoints.up('sm')]: {
      position: "absolute",
      left: "0",
      '& img': {
        width: "20px"
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& img': {
        width: "15px"
      }
    }
  },
  innerItemDate: {
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.up('sm')]: {
      width: "15%",
      position: "relative",
      paddingLeft: "35px"
    },
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "auto"
    }
  },
  toItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  unreadItem: {
    backgroundColor: grey[500], 
    color: "#fff", 
    borderRadius: "5px", 
    textAlign: "center",
    width: "25px",
    padding: "3px"
  },
  addButton: {
    position: "fixed",
    right: 12,
    bottom: 12,
  },
  modalBg: {
    position: "fixed", zIndex: 1, top: 0, left: 0, width: "100%", height: "120%", backgroundColor: "rgba(0,0,0,0.75)"
  },
  logo: {
    width: "100%",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});
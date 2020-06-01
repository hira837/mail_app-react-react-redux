import brown from '@material-ui/core/colors/brown'
import grey from '@material-ui/core/colors/grey'
import lightBlue from '@material-ui/core/colors/lightBlue'
import iconMailSp from '../img/icon_mail_sp.svg'

export const commonStyles = theme => ({
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
      borderLeft: "1px solid #000"
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
      width: "50%"
    }
  },
  titleDate: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: "8px",
      paddingLeft: "8px",
      borderLeft: "1px solid #000"
    },
    [theme.breakpoints.up('sm')]: {
      width: "10%"
    }
  },
  titleItemIcon: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // "& svg" {
    //   height: ".8rem"
    // }
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
      width: "18%",
    },
  },
  innerItemTo: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: "5px"
    },
    [theme.breakpoints.up('sm')]: {
      width: "18%",
    },
  },
  innerItemUnread: {
    [theme.breakpoints.up('sm')]: {
      width: "4%",
    }
  },
  innerItemSubject: {
    [theme.breakpoints.up('sm')]: {
      width: "45%",
    },
  },
  innerItemClip: {
    [theme.breakpoints.up('sm')]: {
      width: "5%",
      '& img': {
        width: "20px"
      }
    },
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      top: "10px",
      right: "80px",
      '& img': {
        width: "15px"
      }
    }
  },
  innerItemDate: {
    [theme.breakpoints.up('sm')]: {
      width: "10%",
    },
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "auto"
    }
  },
  unreadItem: {
    backgroundColor: grey[700], 
    color: "#fff", borderRadius: "5px", textAlign: "center"
  },
  addButton: {
    position: "fixed",
    right: 12,
    bottom: 12,
  },
  modalBg: {
    position: "fixed", zIndex: 1, top: 0, left: 0, width: "100%", height: "120%", backgroundColor: "rgba(0,0,0,0.75)"
  }
});
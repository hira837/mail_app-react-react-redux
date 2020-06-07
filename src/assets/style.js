import grey from '@material-ui/core/colors/grey'
import arrowRight from '../assets/img/icon_arrow02.svg'

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
      height: "40px",
    }
  },
  titleItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.down('sm')]: {
      fontSize: ".8rem",
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
      borderLeft: "1px solid #ddd",
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
      borderLeft: "1px solid #ddd"
    },
    [theme.breakpoints.up('sm')]: {
      width: "45%"
    }
  },
  titleDate: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: "8px",
      paddingLeft: "8px",
      borderLeft: "1px solid #ddd"
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
      paddingLeft: "20px",
    },
    [theme.breakpoints.up('sm')]: {
      width: "20%",
    },
  },
  innerItemTo: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: "5px",
      paddingLeft: "20px",
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
      marginRight: "5px",
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
      width: "auto",
      paddingRight: "15px",
      backgroundImage: `url(${arrowRight})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "100% 50%",
      backgroundSize: "5px"
    }
  },
  toItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  unreadItem: {
    backgroundColor: "#979797", 
    color: "#fff", 
    borderRadius: "5px", 
    textAlign: "center",
    width: "25px",
    padding: "3px 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      width: "35px",
      height: "25px",
    }
  },
  addButton: {
    position: "fixed",
    right: 12,
    bottom: 12,
    zIndex: 2
  },
  updataButton: {
    position: "fixed",
    left: 12,
    bottom: 12,
  },
  doneButton: {
    [theme.breakpoints.up('sm')]: {
      marginTop: "15px",
      marginRight: "15px",
    },
    [theme.breakpoints.down('sm')]: {
      position: "fixed",
      right: "10px",
      top: "25px",
    }
  },
  cancelButton: {
    [theme.breakpoints.down('sm')]: {
      position: "fixed",
      right: "10px",
      top: "80px",
    }
  },
  modalBg: {
    position: "fixed", zIndex: 3, top: 0, left: 0, width: "100%", height: "120%", backgroundColor: "rgba(0,0,0,0.75)"
  },
  logo: {
    width: "100%",
    height: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  calendarParent: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      margin: "10px",
    }
  },
  calendarInput: {
    height: "50px", 
    width: "300px", 
    cursor: "pointer",
    marginBottom: "15px",
    border: "2px solid #f5f5f5",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: "10px",
    [theme.breakpoints.down('sm')]: {
      width: "auto",
      height: "40px"
    },
  },
  calendarItem: {
    width: "100px",
    margin: "0 10px"
  },
  calendarIcon: {
    width: "25px",
    height: "25px",
    [theme.breakpoints.down('sm')]: {
      width: "20px",
      height: "20px"
    },
  },
  calendarInner: {
    width: "100%",
    position: "absolute", 
    zIndex: 4, 
    overflow: "hidden", 
  },
  searchItem: {
    height: "50px",
    width: "50px", 
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    [theme.breakpoints.down('sm')]: {
      height: "40px"
    },
  },
  searchIcon: {
    width: "25px", heigt: "25px",
    [theme.breakpoints.down('sm')]: {
      width: "20px",
      height: "20px"
    },
  },
  resultItem: {
    fontWeight: "700",
    marginBottom: "5px",
    [theme.breakpoints.down('sm')]: {
      margin: "10px 5px",
    }
  },
  iconMailSp: {
    [theme.breakpoints.down('sm')]: {
      position: "absolute",
      top: "15px",
      left: "10px"
    }
  },
  iconMailSpItem: {
    width: "15px",
    height: "auto"
  }
});

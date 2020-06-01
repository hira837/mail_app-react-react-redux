import brown from '@material-ui/core/colors/brown'
import grey from '@material-ui/core/colors/grey'
import lightBlue from '@material-ui/core/colors/lightBlue'

export const commonStyles = theme => ({
  tableHead: {
    backgroundColor: brown[50],
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: "50px",
    color: grey[700],
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd"
  },
  tableItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px"
  },
  tableInnerRow: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "50px",
    borderBottom: "1px solid #ddd",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column",
      height: "auto",
      width: "100%"
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row",
      '& div:nth-child(2)': {
        width: "18%",
      },
      '& div:nth-child(3)': {
        width: "4%"
      },
      '& div:nth-child(4)': {
        width: "45%"
      },
      '& div:nth-child(5)': {
        width: "5%"
      },
      '& div:nth-child(6)': {
        width: "10%"
      },
    }
  },
  tableInnerItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px",
    overflow: "hidden"
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
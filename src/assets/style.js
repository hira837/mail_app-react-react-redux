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
    borderBottom: "1px solid #ddd"
  },
  tableInnerItem: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px",
    overflow: "hidden"
  },
  addButton: {
    position: "fixed",
    right: 12,
    bottom: 12,
  }
});
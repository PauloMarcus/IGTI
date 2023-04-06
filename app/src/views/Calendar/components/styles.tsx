import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    table: {
        borderTop: "1px solid rgb(224,224,224)",
        tableLayout: 'fixed',
        minHeight: '100%',
        "& td ~ td, & th ~ th": {
            borderLeft: "1px solid rgb(224,224,224)"
        },
        "& td": {
            verticalAlign: 'top',
            overflowX: 'hidden'
        },
    },
    mutedDay: {},

    dayOfMonth: {

    },
    event: {
        display: 'block',
        border: 'none',
        borderRadius: 3,
        paddingLeft: 6,
        color: 'white',
        fontWeight: 300,
        textAlign: 'left',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        marginBottom: 5,
    }
})

export default styles 
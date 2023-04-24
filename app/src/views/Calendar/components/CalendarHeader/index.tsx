import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import getMonth, { prevMonth, nextMonth } from "../../../../components/getMonth";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileDropDown from "./components/DropDownMenu";
import React from "react";

type Props = {
    month: string
}

export const CalendarHeader = React.memo((props: Props) =>{
    const {month} = props
    return (
        <Box style={{ height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box style={{display: 'flex', alignItems: 'center'}}>
                <Box style={{ display: 'flex', padding: '0 25px' }}>
                    <Link to={'/calendar/' + prevMonth(month!)}>
                        <NavigateBeforeIcon style={{ fontSize: 30 }} />
                    </Link>
                    <Link to={'/calendar/' + nextMonth(month!)}>
                        <NavigateNextIcon style={{ fontSize: 30 }} />
                    </Link>
                </Box>
                <Box component={'h2'}>
                    {getMonth(month!)}
                </Box>
            </Box>
            <ProfileDropDown />
        </Box>
    )
})
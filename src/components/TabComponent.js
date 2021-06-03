import { Tabs, Tab, Box, Typography, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCricketMatches } from "../service/cricket-api";
import Score from './Score';

function TabComponent() {

    const [value, setValue] = useState(0);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getCricketMatches().then(data => {
            setMatches(data.matches);
            console.log(data.matches);
        }).catch(error => console.log(error));
    }, []);

    const handleChange = (e, value) => {
        setValue(value);
    }

    function TabPanel(props) {
        return (
            <Box>
                {props.value === props.index && (
                    <Box>
                        <Typography>
                            {props.children}
                        </Typography>
                    </Box>
                )}
            </Box>
        )
    }

    function getData(type) {
        return (
            matches.map(match => {
                return (
                    <>
                        {match.type === type ?
                            <Box alignItems="center" display="flex" justifyContent="center">
                                <Score match={match} key={match.unique_key} />
                            </Box>
                            : ""}
                    </>
                )
            })
        )
    }

    const CustomTab = withStyles({
        root: {
            backgroundColor: 'black',
            color: 'white'
        }
    })(Tab);

    return (
        <div>
            <Tabs value={value} onChange={handleChange} textColor="secondary" >
                <CustomTab label="One Day" />
                <CustomTab label="Twenty 20" />
                <CustomTab label="Test" />
            </Tabs>
            <TabPanel value={value} index={0}>{getData("")}</TabPanel>
            <TabPanel value={value} index={1}>{getData("Twenty20")}</TabPanel>
            <TabPanel value={value} index={2}>{getData("Tests")}</TabPanel>
        </div>
    )
}

export default TabComponent;
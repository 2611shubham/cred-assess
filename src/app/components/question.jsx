import { Stack, Typography, Checkbox, FormControlLabel } from "@mui/material";
const Question = ({ question, index, answer, onChecked }) => {


    return <Stack sx={{ background: "#fff", borderRadius: "20px", padding: "24px" }}>

        <Typography >
            {`${index + 1}. `}  {question.question}
        </Typography>
        <Stack flexDirection={"row"} className="options">

            {
                question.options?.map((optionValue) => {

                    return <FormControlLabel
                        key={optionValue}
                        label={optionValue}
                        control={
                            <Checkbox
                                checked={optionValue === answer}
                                onChange={() => {
                                    onChecked(optionValue)
                                }}
                            />
                        }
                    />

                })
            }

        </Stack>

    </Stack>

}

export default Question;
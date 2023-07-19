import { FC } from 'react';
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { MuiFileInput } from "mui-file-input";
import FormData from 'form-data'
import { siApi, axiosApiInstance } from '@shared/api/user-client/si-api';
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { BASE_PATH } from '@shared/api/axios-client/base';

const SoundCheck: FC = () => {
    const [file, setFile] = useState<File | null>(null)


    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        let formData = new FormData();

        formData.append('file', file);

        const options = {
            headers: formData.getHeaders,
            data: formData
        }
        const resp = await siApi.predictPost(options)
        alert(JSON.stringify(resp.data));
    };


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="400px"
            margin="36px auto auto"
        >
            <Box mb={6}>
                <Typography display="block" variant="h3" component="h4" align='center'>
                    Select file to recognize speaker
                </Typography>
            </Box>
            <form
                noValidate
                autoComplete="off"
                style={{ width: '100%' }}
                onSubmit={onSubmit}
            >
                <Box mb={2}>
                    <MuiFileInput
                        value={file}
                        placeholder="Select a file"
                        onChange={setFile}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!file}
                    fullWidth
                >
                    Recognize
                </Button>
            </form>
        </Box>

    );
};

export default SoundCheck
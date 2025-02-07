import axios from "axios";
//import { NFTStorage } from "nft.storage";

const NFT_STORAGE_TOKEN = process.env.REACT_APP_NFT_STORAGE_TOKEN;

const PINATA_JWT = `Bearer ${process.env.REACT_APP_PINATA_JWT}`;

export const UPLOADING_FILE_TYPES = {
    OTHERS: 0,
    JSON: 1,
};

/* Pinata */

export const pinFileToPinata = async (file) => {
    let ipfsCid = "";
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({
        name: `probo-${Date.now()}`,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: PINATA_JWT,
            },
        }
    );
    ipfsCid = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
    return ipfsCid;
};

export const pinMultiFilesToPinata = async (
    filelist,
    type = UPLOADING_FILE_TYPES.IMAGE
) => {
    let ipfsCid = "";
    try {
        if (filelist?.length <= 0) return null;
        const formData = new FormData();

        Array.from(filelist).forEach((file) => {
            formData.append("file", file);
        });

        const metadata = JSON.stringify({
            name: `${type}_${Date.now()}`,
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxBodyLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: PINATA_JWT,
                    },
                }
            );
            ipfsCid = res.data.IpfsHash;
        } catch (error) {
            ipfsCid = null;
        }
    } catch (error) {
        ipfsCid = null;
    }

    return ipfsCid;
};

export const pinJsonToPinata = async (jsonObj) => {
    let ipfsCid = "";
    let res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        { ...jsonObj },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: PINATA_JWT,
            },
        }
    );
    ipfsCid = `https://ipfs.io/ipfs/${res.data.IpfsHash}`;
    return ipfsCid;
};

export const pinUpdatedJsonDirectoryToPinata = async (
    namelist,
    jsonlist,
    type = UPLOADING_FILE_TYPES.IMAGE
) => {
    let ipfsCid = "";
    try {
        if (jsonlist?.length <= 0) return null;
        let formData = new FormData();
        for (let idx = 0; idx < jsonlist.length; idx++) {
            formData.append(
                "file",
                new Blob([jsonlist[idx]], { type: "application/json" }),
                `json/${namelist[idx].name}`
            );
        }

        const metadata = JSON.stringify({
            name: `${type}_${Date.now()}`,
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);
        try {
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                formData,
                {
                    maxBodyLength: "Infinity",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: PINATA_JWT,
                    },
                }
            );
            ipfsCid = res.data.IpfsHash;
        } catch (error) {
            ipfsCid = null;
        }
    } catch (error) {
        ipfsCid = null;
    }

    return ipfsCid;
};

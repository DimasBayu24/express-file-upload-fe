import React, { useState, useEffect } from 'react'
import { Typography, TextField, makeStyles, Button } from '@material-ui/core'
import axios from 'axios'
const ShoppingCart = () => {
    const classes = useStyles();
    const [pertanyaan, setPertanyaan] = useState("");
    const [jawaban, setJawaban] = useState("");
    const [kategori, setKategori] = useState("");
    const [subKategori, setSubKategori] = useState("");
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState(null)
    const [dataKategori, setDataKategori] = useState(null)
    const [dataSubKategori, setDataSubKategori] = useState(null)

    const handleFile = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }
    const getKategori = () => {

        axios.get('http://localhost:8080/getkategori/')
            .then(async (res) => {
                await setDataKategori(res.data);
                await console.log(res.data);

            })
            .catch((error) => {
                console.log('gagal');
            })
    }
    const getSubKategori = () => {

        axios.get('http://localhost:8080/getsubkategori/')
            .then(async (res) => {
                await setDataSubKategori(res.data);
                await console.log(res.data);

            })
            .catch((error) => {
                console.log('gagal');
            })
    }
    const getData = () => {

        axios.get('http://localhost:8080/get/')
            .then(async (res) => {
                await setData(res.data);
                await console.log(res.data);

            })
            .catch((error) => {
                console.log('gagal');
            })
    }

    const deleteKategori = (id) => {
        let data = {
            id: id
        }

        axios.delete('http://localhost:8080/deletesoalbykategori/', { id: id })
            .then(async (res) => {

                axios.delete('http://localhost:8080/deletekategori/', { id: id })
                    .then(async (res) => {
                        console.log("sukses");
                        getData();
                    })
                    .catch((error) => {
                        console.log("gagal");
                    })
            })
            .catch((error) => {
                console.log('gagal');
            })
    }
    const tes = () => {
        console.log(file);
        console.log(fileName);
        const formData = new FormData();

        formData.append('file', file);
        formData.append('pertanyaan', pertanyaan);
        formData.append('jawaban', jawaban);
        formData.append('kategori', kategori);
        formData.append('subkategori', subKategori);
        axios.post('http://localhost:8080/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function () {
            console.log('SUCCESS!!');
            getData();
        })
            .catch(function () {
                console.log('FAILURE!!');
            });
    }
    const coba = () => {
        console.log(dataKategori);
        console.log(dataSubKategori);
    }
    useEffect(() => {
        getData();
        getKategori();
        getSubKategori();
    }, [])

    return (
        <div className="">
            <div className="flex-column h-screen">
                <div className="w-2/3" >
                    <div className="">
                        <span className="mr-4" style={{ color: '#F5222D' }} >

                        </span>
                        <Typography className={classes.text} >Soal</Typography>

                    </div>
                    <TextField variant="outlined" placeholder="tulis pertanyaan" size="small" fullWidth className={classes.input} onChange={(e) => setPertanyaan(e.target.value)} />
                </div>
                <div className="w-2/3" >
                    <div className="">
                        <span className="mr-4" style={{ color: '#F5222D' }} >

                        </span>
                        <Typography className={classes.text} >Jawaban</Typography>

                    </div>
                    <TextField variant="outlined" placeholder="tulis jawaban" size="small" fullWidth className={classes.input} onChange={(e) => setJawaban(e.target.value)} />
                </div>
                <div style={{ height: 20 }} />
                <input type="file" name="file"
                    onChange={(e) => handleFile(e)}
                />
                <div className="w-2/3" >
                    <div className="">
                        <span className="mr-4" style={{ color: '#F5222D' }} >

                        </span>
                        <Typography className={classes.text} >Kategori</Typography>

                    </div>
                    <TextField variant="outlined" placeholder="tulis kategori" size="small" fullWidth className={classes.input} onChange={(e) => setKategori(e.target.value)} />
                </div>
                <div className="w-2/3" >
                    <div className="">
                        <span className="mr-4" style={{ color: '#F5222D' }} >

                        </span>
                        <Typography className={classes.text} >Sub Kategori</Typography>

                    </div>
                    <TextField variant="outlined" placeholder="tulis sub kategori" size="small" fullWidth className={classes.input} onChange={(e) => setSubKategori(e.target.value)} />
                </div>
                <button onClick={tes} >
                    submit
                </button>
                <button onClick={coba} >
                    tes aja terus
                </button>
                <div style={{ height: 10 }} />
                <div className="flex flex-row" >
                    <div style={{ borderWidth: 1, borderColor: 'black' }} className="w-1/2" >
                        {
                            dataKategori === null ?
                                null :
                                dataKategori.map((item, index) => (
                                    <>
                                        <p> ID : {item.id}</p>
                                        <p> Kategori : {item.kategori}</p>
                                        <div className="flex flex-row" >
                                            <button >edit</button>
                                            <div style={{ width: 10 }} />
                                            <button onClick={() => deleteKategori(item.id)} >delete</button>
                                        </div>
                                    </>
                                ))
                        }
                    </div>
                    <div style={{ borderWidth: 1, borderColor: 'black' }} className="w-1/2" >
                        {
                            dataSubKategori === null ?
                                null :
                                dataSubKategori.map((item, index) => (
                                    <>
                                        <p> ID : {item.id}</p>
                                        <p>Sub Kategori : {item.subkategori}</p>
                                        <div className="flex flex-row" >
                                            <button>edit</button>
                                            <div style={{ width: 10 }} />
                                            <button>delete</button>
                                        </div>
                                    </>
                                ))
                        }
                    </div>
                </div>
            </div>

            <div className="flex-column h-full">
                {
                    data === null ?
                        null :
                        data.map((item, index) => (
                            <div>
                                <p>pertanyaan: {item.pertanyaan}</p>
                                <p>jawaban: {item.jawaban}</p>
                                <p>gambar:</p>
                                <img src={item.gambar} />
                                <p>kategori : {item.kategori}</p>
                                <p>sub kategori : {item.subkategori}</p>
                                <div style={{ height: 10 }} />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default ShoppingCart

const useStyles = makeStyles({
    text: {
        fontSize: 14,
        fontFamily: 'Karla'
    },
    title: {
        fontSize: 24,
        fontFamily: 'Neue-Machina',
        fontWeight: '800'
    },
    input: {
        fontFamily: 'Karla',
        fontSize: 16,
    },
    icon: {
        marginLeft: 4,
        color: '#8C8C8C',
        marginRight: 4,
        fontSize: 15,
    },
    button: {
        color: '#FFFFFF',
        backgroundColor: '#52C41A',
        fontFamily: 'Karla',
        fontSize: 16,
    },
    textQ: {
        fontSize: 14,
        color: '#8C8C8C',
        fontFamily: 'Karla',
    }
});
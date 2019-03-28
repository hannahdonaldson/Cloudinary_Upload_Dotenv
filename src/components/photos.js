import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = prosses.env.CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_UPLOAD_URL = prosses.env.CLOUDINARY_UPLOAD_URL


export default class Photos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ""
        }
        this.onImageDrop = this.onImageDrop.bind(this)
        this.handleImageUpload = this.handleImageUpload.bind(this)
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0])  
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file)

        upload.end((error, response) => {
            if (error) {
                console.log('handleImageUpload error', error)
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                })
            }
        })
    }


    render() {
        return(
            <div className='photos'>
                <form>
                    <div className = "">
                        <Dropzone
                            onDrop = {this.onImageDrop}
                            multiple = {false}
                            accept = "image/*">
                            <div className = "">Drop an image or click to upload a picture</div>
                        </Dropzone>
                    </div>
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null : 
                    <div>
                        <p>{this.state.uploadedFile.name}</p>
                        <img src={this.state.uploadedFileCloudinaryUrl} />
                    </div>}
                    </div>
                </form>
            </div>
        )
    }
}
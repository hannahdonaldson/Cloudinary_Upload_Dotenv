import React, { Component } from 'react';
import axios from 'axios'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'


export default class PhotoReturn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gallery: []
        }
    }

    componentDidMount() {
        axios.get(`https://res.cloudinary.com/${prosses.env.CLOUD_NAME}/image/list/react-test.json`)
        .then(res => {
            console.log(res.data.resources);
            this.setState({
                gallery: res.data.resources
            });
        })
    } 
    
    // restful api deal with json data
    //  sopa api deals with xml data

    render() {
        return(
            <div className = 'photo-return'>
                    <CloudinaryContext cloudName={`${prosses.env.CLOUD_NAME}`}>
                        {
                            this.state.gallery.map(data => {
                                return (
                                    <div className="responsive" key={data.public_id}>
                                        <div className="img">
                                            <a target="_blank" href={`https://res.cloudinary.com/${prosses.env.CLOUD_NAME}/image/upload/${data.public_id}.jpg`}>
                                                <Image publicId={data.public_id}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="300"
                                                        height="200"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                                                </Image>
                                            </a>
                                            <div className="desc">Created at {data.created_at}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </CloudinaryContext>
            </div>
        )
    }
}
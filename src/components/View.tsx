// import dotenv from "dotenv";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import styled from "@emotion/styled";
import { useEffect, useLayoutEffect, useState, useRef, useCallback } from "react";
import { createApi } from "unsplash-js";
import _, { entries } from 'lodash';

export default function View() {
    const targetRef = useRef(null);
    const rootRef = useRef(null);
    const [images, setImages] = useState<Array<any>>([]);
    const pages = useRef(1);

    useIntersectionObserver({
        root: rootRef.current,
        target: targetRef.current,
        onIntersect: (entries: any, observer: any) => {
            console.log(entries, observer);
            if (entries[0]['isIntersecting']) {
                fetchingImages();
            }
        },
        threshold: 0.2
    });

    useLayoutEffect(() => {
        // setImages([]);
    }, [])

    // const fetchingImages = useCallback(() => {

    //     const unsplash = createApi({ accessKey: String(process.env.UNSPLASH_API_KEY) })

    //     unsplash.search.getPhotos({
    //         query: "cat",
    //         perPage: 10,
    //         page: pages.current,
    //         orderBy: "latest"
    //     }).then(res => {
    //         const resultData: any[] | undefined = res.response?.results;
    //         if (res.type === 'success') {
    //             if (resultData !== undefined) {
    //                 pages.current += 1;
    //                 setImages((prevImages) => { return [...prevImages, ...resultData] });
    //             }
    //         }
    //     })
    // }, [pages.current, setImages])

    const fetchingImages = () => {

        const unsplash = createApi({ accessKey: String(process.env.UNSPLASH_API_KEY) })

        unsplash.search.getPhotos({
            query: "cat",
            perPage: 10,
            page: pages.current,
            orderBy: "latest"
        }).then(res => {
            const resultData: any[] | undefined = res.response?.results;
            if (res.type === 'success') {
                if (resultData !== undefined) {
                    pages.current += 1;
                    setImages((prevImages) => { return [...prevImages, ...resultData] });
                }
            }
        })
    }

    return (
        <>
            <button onClick={fetchingImages}>call images</button>
            <Wrapper >
                <ImageWrapper ref={rootRef}>
                    {(images || []).map((item, index) => {
                        return (
                            <div>
                                <img src={item['urls']['small']} width="200" height={"200"}/>
                            </div>
                        )
                    })}
                    <TargetDiv ref={targetRef}></TargetDiv>
                </ImageWrapper>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

const ImageWrapper = styled.div`
    overflow-y: scroll;
    width: 60%;
    height: 600px;
`

const TargetDiv = styled.div`
    width: 50px;
    height: 50px;
`
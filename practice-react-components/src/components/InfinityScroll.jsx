import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const fetchDatas = async (page) => {
    if (page > 10) return [];
    const { datas } = await new Promise((resolve) => setTimeout(() => {
        resolve(DATA[page]);
    }, 300));
    return datas;
};


export default function InfinityScroll() {
    const target = useRef(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const {observe, disconnect} = useIntersectionObserver(() => {
        setPage((page) => page + 1);
    });

    const appendData = (page) => {
        fetchDatas(page).then((datas) => {
            setData((prev) => [...prev, ...datas]);
        });
    }

    useEffect(() => {
        observe(target.current);
        return () => {
            disconnect();
        }
    }, []);

    useEffect(() => {
        appendData(page);
    }, [page]);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <Item key={item}>{item}</Item>
                ))}
            </ul>
            <div ref={target} style={{ width: '100%', height: 30 }} />
        </div>
    );
}

const Item = styled.li`
    padding: 10px;
    margin: 10px;
    height: 200px;
    border: 1px solid #000;
`;

const DATA = {
    0: { datas: [], total: 50},
    1: { datas: [1, 2, 3, 4, 5], total: 50 },
    2: { datas: [6, 7, 8, 9, 10], total: 50 },
    3: { datas: [11, 12, 13, 14, 15], total: 50 },
    4: { datas: [16, 17, 18, 19, 20], total: 50 },
    5: { datas: [21, 22, 23, 24, 25], total: 50 },
    6: { datas: [26, 27, 28, 29, 30], total: 50 },
    7: { datas: [31, 32, 33, 34, 35], total: 50 },
    8: { datas: [36, 37, 38, 39, 40], total: 50 },
    9: { datas: [41, 42, 43, 44, 45], total: 50 },
    10: { datas: [46, 47, 48, 49, 50], total: 50 },
}

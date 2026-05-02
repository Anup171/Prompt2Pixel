import React, { useState, useEffect, use } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/searchbar';
import ImageCard from '../components/imagecard';
import { GetPosts } from '../api';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
  min-height: calc(100vh - 68px);
  overflow-y: auto;
  background: ${({ theme }) => theme.bg};
  padding: 48px 40px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  @media (max-width: 768px) {
    padding: 28px 16px 50px;
    gap: 32px;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  max-width: 640px;
`;

const Headline = styled.h1`
  font-family: "Syne", sans-serif;
  font-size: 42px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.5px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const Subheadline = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.7;
  margin: 0;
  font-weight: 400;
`;

const GradientSpan = styled.span`
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GridWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 20px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 500;
`;

const Home = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filtered, setFiltered] = useState([]);

    const getPosts = async () => {
      setLoading(true);
      await GetPosts().then ((res)=>{
        setLoading(false);
        setPosts(res?.data?.data);
        setFiltered(res?.data?.data);
      }).catch((error) => {
      setError(error?.response?.data?.message);
      setLoading(false);
    });
    };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if(!search){
      setFiltered(posts);
      return;
    }
    const SearchfilteredPosts =posts.filter((post)=>{
      const searchText = search.toLowerCase();
      const promptMatch = post?.prompt?.toLowerCase().includes(searchText);
      const authorMatch =post?.name?.toLowerCase().includes(searchText);

      return promptMatch || authorMatch;
    });
    if(search){
      setFiltered(SearchfilteredPosts);
    }
  },[posts,search])

  return (
    <Container>
      <HeroSection>
        <Headline>
          Explore <GradientSpan>AI-Generated</GradientSpan> Images
        </Headline>
        <Subheadline>
          Discover community creations or generate your own. Turn ideas into visuals.
        </Subheadline>
        <SearchBar search={search} setSearch={setSearch} />
      </HeroSection>
      <GridWrapper>
          {error && <div style={{color:'red'}}>{error}</div>}
          {loading ?(
            <CircularProgress/>
          ):(
          <CardWrapper>
            {filtered.length == 0 ?<>No Posts Found</>:
            <>
            {filtered.slice()
            .reverse()
            .map((item,index)=>(
              <ImageCard key={index} item={item}/>
            ))}
            </>}
          </CardWrapper>
        )}
      </GridWrapper>
    </Container>
  );
};

export default Home;

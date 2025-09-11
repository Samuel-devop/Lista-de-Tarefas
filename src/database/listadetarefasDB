--
-- PostgreSQL database dump
--

\restrict RBnH1XGpbNSli1lcXJvJZqFaI4z0In4QpYtTjZXNfoilgeVOjVqcxK80XqwwNxk

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-09-11 19:51:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16412)
-- Name: tarefas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarefas (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    custo numeric(10,2) NOT NULL,
    data_limite date NOT NULL,
    ordem_apresentacao integer NOT NULL,
    concluida boolean DEFAULT false
);


ALTER TABLE public.tarefas OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16411)
-- Name: tarefas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarefas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tarefas_id_seq OWNER TO postgres;

--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 217
-- Name: tarefas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarefas_id_seq OWNED BY public.tarefas.id;


--
-- TOC entry 4742 (class 2604 OID 16415)
-- Name: tarefas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas ALTER COLUMN id SET DEFAULT nextval('public.tarefas_id_seq'::regclass);


--
-- TOC entry 4896 (class 0 OID 16412)
-- Dependencies: 218
-- Data for Name: tarefas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarefas (id, nome, custo, data_limite, ordem_apresentacao, concluida) FROM stdin;
46	Aluguel	700.00	2025-09-20	2	f
47	Compras do Mercado	650.00	2025-09-23	3	f
45	Internet	79.90	2025-10-11	1	f
\.


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 217
-- Name: tarefas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarefas_id_seq', 47, true);


--
-- TOC entry 4745 (class 2606 OID 16419)
-- Name: tarefas tarefas_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas
    ADD CONSTRAINT tarefas_nome_key UNIQUE (nome);


--
-- TOC entry 4747 (class 2606 OID 16421)
-- Name: tarefas tarefas_ordem_apresentacao_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas
    ADD CONSTRAINT tarefas_ordem_apresentacao_key UNIQUE (ordem_apresentacao);


--
-- TOC entry 4749 (class 2606 OID 16417)
-- Name: tarefas tarefas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarefas
    ADD CONSTRAINT tarefas_pkey PRIMARY KEY (id);


-- Completed on 2025-09-11 19:51:13

--
-- PostgreSQL database dump complete
--

\unrestrict RBnH1XGpbNSli1lcXJvJZqFaI4z0In4QpYtTjZXNfoilgeVOjVqcxK80XqwwNxk


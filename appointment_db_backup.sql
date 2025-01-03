PGDMP      +                |            appointment_system    17.2    17.2 !    ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            >           1262    16387    appointment_system    DATABASE     �   CREATE DATABASE appointment_system WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1254';
 "   DROP DATABASE appointment_system;
                     postgres    false            �            1259    16462    appointments    TABLE       CREATE TABLE public.appointments (
    id bigint NOT NULL,
    provider_id bigint NOT NULL,
    user_id bigint NOT NULL,
    appointment_date date NOT NULL,
    appointment_time time without time zone NOT NULL,
    status character varying(255) DEFAULT 'booked'::character varying
);
     DROP TABLE public.appointments;
       public         heap r       postgres    false            �            1259    16461    appointments_id_seq    SEQUENCE     |   CREATE SEQUENCE public.appointments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.appointments_id_seq;
       public               postgres    false    223            ?           0    0    appointments_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;
          public               postgres    false    222            �            1259    16420 	   providers    TABLE     �   CREATE TABLE public.providers (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL
);
    DROP TABLE public.providers;
       public         heap r       postgres    false            �            1259    16418    providers_id_seq    SEQUENCE     y   CREATE SEQUENCE public.providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.providers_id_seq;
       public               postgres    false    221            @           0    0    providers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.providers_id_seq OWNED BY public.providers.id;
          public               postgres    false    219            �            1259    16419    providers_user_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.providers_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.providers_user_id_seq;
       public               postgres    false    221            A           0    0    providers_user_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.providers_user_id_seq OWNED BY public.providers.user_id;
          public               postgres    false    220            �            1259    16398    users    TABLE       CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16397    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218            B           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �           2604    16465    appointments id    DEFAULT     r   ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);
 >   ALTER TABLE public.appointments ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    222    223            �           2604    16423    providers id    DEFAULT     l   ALTER TABLE ONLY public.providers ALTER COLUMN id SET DEFAULT nextval('public.providers_id_seq'::regclass);
 ;   ALTER TABLE public.providers ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    219    221            �           2604    16424    providers user_id    DEFAULT     v   ALTER TABLE ONLY public.providers ALTER COLUMN user_id SET DEFAULT nextval('public.providers_user_id_seq'::regclass);
 @   ALTER TABLE public.providers ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    221    220    221            �           2604    16480    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            8          0    16462    appointments 
   TABLE DATA           l   COPY public.appointments (id, provider_id, user_id, appointment_date, appointment_time, status) FROM stdin;
    public               postgres    false    223   �%       6          0    16420 	   providers 
   TABLE DATA           G   COPY public.providers (id, user_id, first_name, last_name) FROM stdin;
    public               postgres    false    221   ~&       3          0    16398    users 
   TABLE DATA           Q   COPY public.users (id, first_name, last_name, email, role, password) FROM stdin;
    public               postgres    false    218   �&       C           0    0    appointments_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.appointments_id_seq', 29, true);
          public               postgres    false    222            D           0    0    providers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.providers_id_seq', 6, true);
          public               postgres    false    219            E           0    0    providers_user_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.providers_user_id_seq', 1, false);
          public               postgres    false    220            F           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
          public               postgres    false    217            �           2606    16468    appointments appointments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_pkey;
       public                 postgres    false    223            �           2606    16428    providers providers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
       public                 postgres    false    221            �           2606    16407    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            �           2606    16410    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           2606    16469 *   appointments appointments_provider_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES public.providers(id);
 T   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_provider_id_fkey;
       public               postgres    false    223    4763    221            �           2606    16474 &   appointments appointments_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_user_id_fkey;
       public               postgres    false    218    223    4761            �           2606    16429    providers fk_user_provider    FK CONSTRAINT     �   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT fk_user_provider FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.providers DROP CONSTRAINT fk_user_provider;
       public               postgres    false    218    4761    221            8   o   x�}λ�0���K���@(TY����������w�PD�h�T�r��T��.��@m�p��+��),2��%�u�BRџ-��P���̙�&����j)�uι��2/      6   l   x��1�@���SxÀb,W-��R�I���`v����Op�h�����W�rI�� ��Nꛦ8� iq�%+����#��cq�c9!��{ZޒW�o�|�I����      3   f  x���Ks�0��˯�!g�y�v�'6~{zX`�Î�L��H;��6=�\�o/��ݕ$8r�}X����%!ٽaM{�Ȼ%`X���d�$�O⌑��@�vy�l��Y~�I:)���C��W���,��r�v� Ö�x>U߮�ί�o�o�	��I�.���Y7j͔�#��h'���v��wz91�({�FT�!zT�E�;|��8�q�K����V-
�I= ��C�0�*nբ�g	��8���tk�V=��X$	��f�sͭZtơ_u�b���W�����'R��̠le�}r,{7���#�`��Q�<� �`�"	^qT9̪a\jF^���dpV��(�a
n��ܾJJ��e�~�Ir����LzQ��p���CD���A�庻X��F��5ud��8禨SLI�'�ͷ?�ωwlk���S���`9`J��0���/�Y�$��uR�.{�5���[
֍@FX�L�qr�	�췾�؞���M7rv�ʹg�>t�g��toԓ�G6^��`Q���`[�����6%�Z�5ON�74�s֤��)���鋋�i�u-��r���(//���m>>�[���uޗ���	���i.     
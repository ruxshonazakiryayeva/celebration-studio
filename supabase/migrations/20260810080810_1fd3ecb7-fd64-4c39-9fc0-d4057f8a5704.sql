CREATE TABLE public.invites (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  template_id text NOT NULL,
  event_type text NOT NULL DEFAULT 'birthday',
  pin text NOT NULL,
  name text NOT NULL,
  age integer,
  event_date timestamptz NOT NULL,
  location_name text,
  location_url text,
  dress_code text,
  cover_image_url text,
  gallery_urls text[] NOT NULL DEFAULT '{}',
  music_url text,
  message text,
  phone text,
  extra jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.wishes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invite_id uuid NOT NULL REFERENCES public.invites(id) ON DELETE CASCADE,
  guest_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_wishes_invite ON public.wishes(invite_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.invites TO anon;
GRANT SELECT, INSERT, UPDATE ON public.invites TO authenticated;
GRANT ALL ON public.invites TO service_role;
GRANT SELECT, INSERT ON public.wishes TO anon;
GRANT SELECT, INSERT ON public.wishes TO authenticated;
GRANT ALL ON public.wishes TO service_role;

ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active invites are publicly readable" ON public.invites FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can create an invite" ON public.invites FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update an active invite" ON public.invites FOR UPDATE USING (is_active = true) WITH CHECK (is_active = true);

CREATE POLICY "Wishes are publicly readable" ON public.wishes FOR SELECT USING (true);
CREATE POLICY "Anyone can leave a wish" ON public.wishes FOR INSERT WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_invites_updated_at BEFORE UPDATE ON public.invites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

REVOKE SELECT ON public.invites FROM anon, authenticated;
GRANT SELECT (id, slug, template_id, event_type, name, age, event_date, location_name, location_url, dress_code, cover_image_url, gallery_urls, music_url, message, phone, extra, is_active, created_at, updated_at) ON public.invites TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.verify_invite_pin(p_slug text, p_pin text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.invites
    WHERE slug = p_slug AND pin = p_pin AND is_active = true
  )
$$;

GRANT EXECUTE ON FUNCTION public.verify_invite_pin(text, text) TO anon, authenticated;
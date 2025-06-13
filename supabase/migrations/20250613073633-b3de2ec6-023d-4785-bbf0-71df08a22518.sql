
-- Drop the existing restrictive policies for admin_roles
DROP POLICY IF EXISTS "Only admins can insert admin roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Only admins can update admin roles" ON public.admin_roles;
DROP POLICY IF EXISTS "Only admins can delete admin roles" ON public.admin_roles;

-- Create a more permissive policy for admin role insertion
-- This allows users to create their own admin role (for the first admin)
-- and existing admins to create roles for others
CREATE POLICY "Allow admin role creation" ON public.admin_roles
  FOR INSERT WITH CHECK (
    -- Allow if no admins exist yet (first admin creation)
    NOT EXISTS (SELECT 1 FROM public.admin_roles)
    OR 
    -- Or if the current user is already an admin
    public.is_admin(auth.uid())
    OR
    -- Or if the user is creating their own admin role
    auth.uid() = user_id
  );

-- Update policy allows only existing admins to modify roles
CREATE POLICY "Only admins can update admin roles" ON public.admin_roles
  FOR UPDATE USING (public.is_admin(auth.uid()));

-- Delete policy allows only existing admins to delete roles
CREATE POLICY "Only admins can delete admin roles" ON public.admin_roles
  FOR DELETE USING (public.is_admin(auth.uid()));

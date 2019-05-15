<?php


namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class InfoSiteAdmin extends Admin
{

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
           // ->add('product')
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))

        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('phone', null, array(
                'label' => 'Телефон',
            ))
            ->add('email', null, array(
                'label' => 'Электронная почта',
            ))
            ->add('address', null, array(
                'label' => 'Адрес',
            ))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }
}